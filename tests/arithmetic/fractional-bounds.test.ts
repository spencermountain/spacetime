import test from 'tape'
import spacetime from '../_lib/index.ts'
import type { TimeUnit } from '../../src/types/index.ts'

const units: TimeUnit[] = ['minute', 'quarterHour', 'hour', 'day', 'week', 'month', 'quarter', 'year']
const starts = [
  ['2020-06-15T12:10:00', 'UTC'],
  ['2020-06-15T12:40:00', 'UTC'],
  ['2020-06-15T12:34:56.789', 'UTC'],
  ['2020-06-15T00:00:00', 'UTC'],
  ['2020-01-31T10:00:00', 'UTC'],
  ['2020-01-31T14:00:00', 'UTC'],
  ['2020-02-29T07:15:00', 'UTC'],
  ['2026-03-08T00:00:00', 'America/New_York'], // 23-hour day.
  ['2026-03-07T22:30:00', 'America/New_York'],
  ['2026-11-01T00:00:00', 'America/New_York'], // 25-hour day.
  ['2026-10-31T22:30:00', 'America/New_York'],
  ['2026-03-29T00:30:00', 'Europe/London'],
  ['2026-04-04T01:15:00', 'Australia/Sydney'],
  ['2026-07-01T09:45:00', 'Asia/Kathmandu']
]

test('a fraction never moves against its direction', (t) => {
  const amounts = [1e-9, 0.1 + 0.2 - 0.3, 0.0001, 0.001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.5, 0.75]
  const failures: string[] = []
  starts.forEach(([input, zone]) => {
    const s = spacetime(input, zone)
    units.forEach((unit) => {
      amounts.forEach((amount) => {
        if (s.add(amount, unit).epoch < s.epoch) {
          failures.push(`${input} ${zone} + ${amount} ${unit}`)
        }
        if (s.subtract(amount, unit).epoch > s.epoch) {
          failures.push(`${input} ${zone} - ${amount} ${unit}`)
        }
      })
    })
  })
  t.deepEqual(failures, [], 'every result is on the correct side of its start')
  t.end()
})

test('larger amounts always give later results', (t) => {
  const amounts: number[] = [0.0001, 0.001, 0.005, 0.9999, 1, 1.0001, 1.9999, 2, 2.0001]
  for (let i = 1; i < 300; i += 1) {
    amounts.push(i / 100)
  }
  amounts.sort((a, b) => a - b)
  const failures: string[] = []
  starts.forEach(([input, zone]) => {
    const s = spacetime(input, zone)
    units.forEach((unit) => {
      let forward = s.epoch
      let backward = s.epoch
      amounts.forEach((amount) => {
        const later = s.add(amount, unit).epoch
        const earlier = s.subtract(amount, unit).epoch
        if (later < forward) {
          failures.push(`${input} ${zone} + ${amount} ${unit}`)
        }
        if (earlier > backward) {
          failures.push(`${input} ${zone} - ${amount} ${unit}`)
        }
        forward = later
        backward = earlier
      })
    })
  })
  t.deepEqual(failures, [], 'results stay in order, including around whole numbers')
  t.end()
})

test('keep the exact time when rounding would pass a whole amount', (t) => {
  const cases = [
    // Rounding would pass the start.
    ['2020-06-15T12:10:00', 'UTC', 0.001, 'day', '2020-06-15T12:11:26.400Z'],
    ['2020-06-15T12:34:56.789', 'UTC', -0.001, 'day', '2020-06-15T12:33:30.389Z'],
    ['2020-06-15T12:34:56.789', 'UTC', -0.001, 'minute', '2020-06-15T12:34:56.729Z'],
    ['2020-06-15T12:10:00', 'UTC', 0.001, 'week', '2020-06-15T12:20:04.800Z'],
    ['2020-06-15T13:00:00', 'UTC', -0.001, 'month', '2020-06-15T12:19:40.800Z'],
    // Rounding would pass the next whole amount.
    ['2020-06-15T12:40:00', 'UTC', 0.9999, 'day', '2020-06-16T12:39:51.360Z'],
    // A snap in the right direction, within the whole amounts, is still rounded.
    ['2020-06-15T12:40:00', 'UTC', 0.001, 'day', '2020-06-15T13:00:00.000Z']
  ] as const
  cases.forEach(([input, zone, amount, unit, expected]) => {
    t.equal(spacetime(input, zone).add(amount, unit).iso(), expected, `${input} + ${amount} ${unit}`)
  })
  t.end()
})

test('fractional days stop at the whole day on DST changes', (t) => {
  const cases = [
    // A 23-hour day. 0.9999 days is nearly 24 hours, which is past the next midnight.
    ['2026-03-08T00:00:00', 0.5, '2026-03-08T13:00:00.000-04:00'],
    ['2026-03-08T00:00:00', 0.9999, '2026-03-09T00:00:00.000-04:00'],
    ['2026-03-08T00:00:00', 1, '2026-03-09T00:00:00.000-04:00'],
    ['2026-03-08T00:00:00', 1.5, '2026-03-09T13:00:00.000-04:00'],
    // A 25-hour day. 1.0001 days is just over 24 hours, which is before the next midnight.
    ['2026-11-01T00:00:00', 0.5, '2026-11-01T11:00:00.000-05:00'],
    ['2026-11-01T00:00:00', 0.9999, '2026-11-01T23:00:00.000-05:00'],
    ['2026-11-01T00:00:00', 1, '2026-11-02T00:00:00.000-05:00'],
    ['2026-11-01T00:00:00', 1.0001, '2026-11-02T00:00:00.000-05:00'],
    ['2026-11-01T00:00:00', 1.5, '2026-11-02T11:00:00.000-05:00']
  ] as const
  cases.forEach(([input, amount, expected]) => {
    t.equal(spacetime(input, 'America/New_York').add(amount, 'day').iso(), expected, `${input} + ${amount} day`)
  })
  t.end()
})

test('ties round toward the start', (t) => {
  const cases = [
    ['2025-06-18T10:30:00Z', 0.5, 'day', '2025-06-18T22:00:00.000Z'],
    ['2025-06-18T10:30:00Z', -0.5, 'day', '2025-06-17T23:00:00.000Z'],
    ['2020-06-15T00:00:00Z', 0.0625, 'day', '2020-06-15T01:00:00.000Z'],
    ['2020-06-15T00:00:00Z', -0.0625, 'day', '2020-06-14T23:00:00.000Z'],
    ['2020-06-15T01:00:00Z', -0.0625, 'day', '2020-06-15T00:00:00.000Z'],
    ['2020-06-15T00:00:00Z', 0.5, 'quarterHour', '2020-06-15T00:07:00.000Z'],
    ['2020-06-15T00:07:00Z', -0.5, 'quarterHour', '2020-06-15T00:00:00.000Z']
  ] as const
  cases.forEach(([input, amount, unit, expected]) => {
    t.equal(spacetime(input, 'UTC').add(amount, unit).iso(), expected, `${input} + ${amount} ${unit}`)
  })
  t.end()
})

test('add and subtract return to a start on a rounding boundary', (t) => {
  const fixed: TimeUnit[] = ['minute', 'quarterHour', 'hour', 'day', 'week']
  const amounts: number[] = []
  for (let i = 1; i < 80; i += 1) {
    if (i % 16 !== 0) {
      amounts.push(i / 16)
    }
    if (i % 10 !== 0) {
      amounts.push(i / 10)
    }
  }
  const s = spacetime('2020-06-15T00:00:00', 'UTC')
  const failures: string[] = []
  fixed.forEach((unit) => {
    amounts.forEach((amount) => {
      if (s.add(amount, unit).subtract(amount, unit).epoch !== s.epoch) {
        failures.push(`+ then - ${amount} ${unit}`)
      }
      if (s.subtract(amount, unit).add(amount, unit).epoch !== s.epoch) {
        failures.push(`- then + ${amount} ${unit}`)
      }
    })
  })
  t.deepEqual(failures, [], 'every round trip returns to the start')
  t.end()
})

test('fractional weeks are the same as their days and hours', (t) => {
  const cases = [
    [0.5, 3.5, 84],
    [1.5, 10.5, 252],
    [0.25, 1.75, 42],
    [0.75, 5.25, 126],
    [-0.5, -3.5, -84],
    [-0.25, -1.75, -42]
  ] as const
  const weekStarts = [
    ['2020-06-15T00:00:00', 'UTC'],
    ['2026-03-05T00:00:00', 'America/New_York'], // Crosses spring forward.
    ['2026-10-29T00:00:00', 'America/New_York'] // Crosses fall back.
  ]
  weekStarts.forEach(([input, zone]) => {
    const start = spacetime(input, zone)
    cases.forEach(([weeks, days, hours]) => {
      const label = `${input} in ${zone}: ${weeks} weeks`
      t.equal(start.add(weeks, 'week').iso(), start.add(days, 'day').iso(), `${label} equals ${days} days`)
      t.equal(start.add(weeks, 'week').iso(), start.add(hours, 'hour').iso(), `${label} equals ${hours} hours`)
    })
  })
  const s = spacetime('2020-06-15T00:00:00', 'UTC')
  t.equal(s.add(0.5, 'week').iso(), '2020-06-18T12:00:00.000Z', 'half a week is three and a half days')
  t.equal(s.add(0.5, 'week').add(0.5, 'week').iso(), s.add(1, 'week').iso(), 'two halves make a week')
  t.end()
})

test('amounts too small to matter leave the start alone', (t) => {
  const s = spacetime('2023-04-01T00:00:00.000Z', 'UTC')
  const noise = 0.1 + 0.2 - 0.3
  units.forEach((unit) => {
    [1e-9, noise, -1e-9, -noise].forEach((amount) => {
      const result = s.add(amount, unit)
      t.ok(Number.isInteger(result.epoch), `${amount} ${unit} keeps a whole epoch`)
      t.ok(result.isEqual(s), `${amount} ${unit} from a boundary is no change`)
    })
  })
  t.end()
})

test('amounts past the supported range stay invalid', (t) => {
  const s = spacetime('2020-06-15T12:10:00', 'UTC')
  const cases = [
    [1e10 + 0.5, 'day'],
    [1e7 + 0.5, 'week'],
    [100000.5, 'month'],
    [100000.5, 'year'],
    [-100000.5, 'month'],
    [1e9 + 0.5, 'hour']
  ] as const
  cases.forEach(([amount, unit]) => {
    t.notOk(s.add(amount, unit).isValid(), `${amount} ${unit} is invalid`)
  })
  t.end()
})
