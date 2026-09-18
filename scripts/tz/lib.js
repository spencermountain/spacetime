import getDstShift from '../../src/timezone/dstShift.js'

const pad = (n) => String(n).padStart(2, '0')

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
      throw new Error('Unordered or out-of-year transition')
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
  if (changes.length !== 2) throw new Error(`Unsupported pattern: ${changes.length} state changes`)
  const [a, b] = changes
  const shift = getDstShift(tz)
  const expected = previous.hem === 'n' ? shift : -shift
  if (
    b.after.offset !== initial.offset ||
    b.after.dst !== initial.dst ||
    a.after.offset - initial.offset !== expected ||
    initial.dst !== (previous.hem === 's') ||
    a.after.dst !== (previous.hem === 'n')
  ) {
    throw new Error('Unsupported offset/DST cycle for runtime hemisphere and shift')
  }
  const boundary = (change) => {
    const d = new Date(change.epoch + Number(change.before.offset * 3600000))
    if (d.getUTCFullYear() !== year || d.getUTCMinutes() || d.getUTCSeconds()) {
      throw new Error('Unsupported boundary: runtime requires whole hours in the target year')
    }
    return `${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}:${pad(d.getUTCHours())}`
  }
  result.offset = a.after.offset
  result.dst = `${boundary(a)}->${boundary(b)}`
  return result
}
