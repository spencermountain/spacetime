import test from 'tape'
import spacetime from '../_lib/index.ts'

test('short timezone names use the instance date and timezone', (t) => {
  const cases = [
    ['2024-01-15T12:00:00Z', 'America/Chicago', 'CST'],
    ['2024-07-15T12:00:00Z', 'America/Chicago', 'CDT'],
    ['2024-03-10T07:59:59Z', 'America/Chicago', 'CST'],
    ['2024-03-10T08:00:00Z', 'America/Chicago', 'CDT'],
    ['2024-07-15T12:00:00Z', 'UTC', 'UTC']
  ] as const
  for (const [date, zone, expected] of cases) {
    const s = spacetime(date, zone)
    const epoch = s.epoch
    t.equal(s.format('timezone-short'), expected, `${zone} at ${date}`)
    t.equal(s.format('{time} {timezone-short}'), `${s.time()} ${expected}`, 'inline token')
    t.equal(s.epoch, epoch, 'formatting preserves the instant')
  }
  t.end()
})

test('short timezone names fall back to the instance offset without Intl', (t) => {
  const cases = [
    [spacetime('2024-01-15', 'America/Chicago'), 'UTC-06:00'],
    [spacetime('2024-07-15', 'America/Chicago'), 'UTC-05:00'],
    [spacetime('2024-01-15', 'Asia/Kathmandu'), 'UTC+05:45'],
    [spacetime('2024-01-15', 'UTC'), 'UTC']
  ] as const
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'Intl')!
  try {
    Object.defineProperty(globalThis, 'Intl', { value: undefined, configurable: true })
    for (const [s, expected] of cases) {
      t.equal(s.format('timezone-short'), expected, expected)
    }
  } finally {
    Object.defineProperty(globalThis, 'Intl', descriptor)
  }
  t.end()
})

test('short timezone names support offsets the runtime does not recognize', (t) => {
  const s = spacetime('2024-01-15', 'utc+5.75')
  const zone = s.timezone()
  Object.defineProperty(s, 'timezone', { value: () => ({ ...zone, name: 'Custom/Example' }) })
  t.equal(s.format('timezone-short'), 'UTC+05:45', 'custom zone with a fractional offset')
  t.equal(spacetime(NaN, 'UTC').format('timezone-short'), '', 'invalid date')
  t.end()
})
