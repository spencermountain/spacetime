import getDstShift from '../../src/timezone/dstShift.js'

const pad = (n) => String(n).padStart(2, '0')
const unsupported = (message, details) => Object.assign(new Error(message), { details })

// Match the runtime's Date.UTC rollover: MM/DD:24 is next day's MM/DD:00.
// Validate the date first so unrelated invalid dates are not silently preserved.
const boundaryTime = (text, year) => {
  const match = /^(\d{2})\/(\d{2}):(\d{2})$/.exec(text || '')
  if (!match) return NaN
  const [month, day, hour] = match.slice(1).map(Number)
  const midnight = new Date(Date.UTC(year, month - 1, day))
  if (midnight.getUTCMonth() !== month - 1 || midnight.getUTCDate() !== day || hour > 24) return NaN
  return Date.UTC(year, month - 1, day, hour)
}

// zdump -i uses tabs; empty abbreviation fields are significant.
export const parseIntervals = (text) => {
  const lines = text.trim().split(/\r?\n/)
  if (!/^TZ=".*"$/.test(lines.shift() || '')) throw new Error('Missing zdump TZ header')
  const records = lines.map((line, i) => {
    const fields = line.split('\t')
    if (fields.length < 3 || fields.length > 5) throw new Error('Invalid interval fields')
    const [date, time, offset, abbreviation = '', flag = '0'] = fields
    const m = /^([+-]?)(\d{2})(\d{2})?(\d{2})?$/.exec(offset)
    if (!m || Number(m[3] || 0) > 59 || Number(m[4] || 0) > 59) {
      throw new Error('Invalid interval offset: ' + offset)
    }
    if (!/^[01]$/.test(flag) || /^"?(-00|zzz)/.test(abbreviation)) {
      throw new Error('Unknown interval state')
    }

    // Convert the hours component to seconds.
    const hoursInSeconds = Number(m[2]) * 3600
    // Convert the optional minutes component to seconds, defaulting to zero.
    const minutesInSeconds = Number(m[3] || 0) * 60
    // Read the optional seconds component, defaulting to zero.
    const secondsComponent = Number(m[4] || 0)
    // Treat a minus sign as negative; otherwise the offset is positive.
    const sign = m[1] === '-' ? -1 : 1
    // Add the components and apply the sign to get the total offset in seconds.
    const seconds = (hoursInSeconds + minutesInSeconds + secondsComponent) * sign

    const record = { offset: seconds / 3600, dst: flag === '1' }
    if (i === 0) {
      if (date !== '-' || time !== '-') throw new Error('Missing initial interval')
      return record
    }
    const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
    const t = /^(\d{2})(?::(\d{2}))?(?::(\d{2}))?$/.exec(time)
    if (!d || !t) throw new Error('Invalid transition timestamp')
    const parts = [
      Number(d[1]),
      Number(d[2]),
      Number(d[3]),
      Number(t[1]),
      Number(t[2] || 0),
      Number(t[3] || 0)
    ]
    const local = Date.UTC(parts[0], parts[1] - 1, parts[2], ...parts.slice(3))
    const check = new Date(local)
    if (
      [
        check.getUTCFullYear(),
        check.getUTCMonth() + 1,
        check.getUTCDate(),
        check.getUTCHours(),
        check.getUTCMinutes(),
        check.getUTCSeconds()
      ].some((n, j) => n !== parts[j])
    ) {
      throw new Error('Out-of-range transition timestamp')
    }
    return { ...record, epoch: local - Number(seconds * 1000) }
  })
  if (!records.length) throw new Error('Missing initial interval')
  return { initial: records[0], transitions: records.slice(1) }
}

// The runtime stores one chronological interval, with the opposite offset outside it.
// Its boundaries are local wall times BEFORE each change, at whole hours.
export const normalizeZone = (intervals, previous, tz, year) => {
  const { initial, transitions } = intervals
  const start = Date.UTC(year, 0, 1)
  const end = Date.UTC(year + 1, 0, 1)
  let lastEpoch = start - 1
  let state = initial
  const changes = []
  for (const next of transitions) {
    if (next.epoch <= lastEpoch || next.epoch < start || next.epoch >= end) {
      throw unsupported('Unordered or out-of-year transition', [
        `Observed UTC instant: ${new Date(next.epoch).toISOString()}`,
        `Expected increasing instants within ${year}-01-01 through ${year + 1}-01-01 (exclusive).`
      ])
    }
    lastEpoch = next.epoch
    // Abbreviation-only transitions do not change runtime behavior.
    if (next.offset !== state.offset || next.dst !== state.dst) {
      changes.push({ before: state, after: next, epoch: next.epoch })
    }
    state = next
  }
  const result = { ...previous, offset: initial.offset }
  delete result.dst
  if (!changes.length) return result
  if (changes.length !== 2) throw unsupported(`Unsupported pattern: ${changes.length} state changes`, [
    'The runtime supports a fixed offset or exactly two changes forming one annual cycle.',
    `Observed ${changes.length} offset/DST changes across ${transitions.length} transition records.`
  ])
  const [a, b] = changes
  const shift = getDstShift(tz)
  const expected = previous.hem === 'n' ? shift : -shift
  const mismatches = []
  if (b.after.offset !== initial.offset) {
    mismatches.push(`Final offset must return to the initial offset: expected ${initial.offset}h, observed ${b.after.offset}h.`)
  }
  if (b.after.dst !== initial.dst) {
    mismatches.push(`Final DST flag must return to the initial flag: expected ${initial.dst}, observed ${b.after.dst}.`)
  }
  if (a.after.offset - initial.offset !== expected) {
    mismatches.push(`First offset change: expected ${expected * 60} minutes, observed ${(a.after.offset - initial.offset) * 60} minutes.`)
  }
  if (initial.dst !== (previous.hem === 's')) {
    mismatches.push(`Initial DST flag for hemisphere "${previous.hem}": expected ${previous.hem === 's'}, observed ${initial.dst}.`)
  }
  if (a.after.dst !== (previous.hem === 'n')) {
    mismatches.push(`DST flag after first change for hemisphere "${previous.hem}": expected ${previous.hem === 'n'}, observed ${a.after.dst}.`)
  }
  if (mismatches.length) {
    throw unsupported('Unsupported offset/DST cycle for runtime hemisphere and shift', mismatches)
  }
  const boundary = (change) => {
    const d = new Date(change.epoch + Number(change.before.offset * 3600000))
    if (d.getUTCFullYear() !== year || d.getUTCMinutes() || d.getUTCSeconds()) {
      throw unsupported('Unsupported boundary: runtime requires whole hours in the target year', [
        `Pre-change local boundary: ${d.toISOString().replace('T', ' ').replace('.000Z', '')} (must be a whole hour in ${year}).`,
        `Transition instant: ${new Date(change.epoch).toISOString()}`
      ])
    }
    return `${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}:${pad(d.getUTCHours())}`
  }
  result.offset = a.after.offset
  const oldBoundaries = (previous.dst || '').split('->')
  result.dst = [boundary(a), boundary(b)].map((next, i) => {
    const old = oldBoundaries[i]
    // Keep each equivalent boundary's spelling, even when the other boundary changes.
    return oldBoundaries.length === 2 && boundaryTime(old, year) === boundaryTime(next, year)
      ? old
      : next
  }).join('->')
  return result
}
