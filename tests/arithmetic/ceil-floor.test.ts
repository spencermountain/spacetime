import test from 'tape'
import spacetime from '../_lib/index.ts'
import type { TimeUnit } from '../../src/types/index.ts'

test('ceil goes to the next boundary', (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  const cases: [TimeUnit, string][] = [
    ['minute', '2024-01-15T14:38:00.000Z'],
    ['quarterHour', '2024-01-15T14:45:00.000Z'],
    ['hour', '2024-01-15T15:00:00.000Z'],
    ['day', '2024-01-16T00:00:00.000Z'],
    ['week', '2024-01-22T00:00:00.000Z'],
    ['month', '2024-02-01T00:00:00.000Z'],
    ['quarter', '2024-04-01T00:00:00.000Z'],
    ['season', '2024-03-01T00:00:00.000Z'],
    ['year', '2025-01-01T00:00:00.000Z'],
    ['decade', '2030-01-01T00:00:00.000Z'],
    ['century', '2100-01-01T00:00:00.000Z']
  ]
  cases.forEach(([unit, iso]) => {
    t.equal(s.ceil(unit).iso(), iso, `ceil(${unit})`)
  })
  t.equal(s.ceil('hours').iso(), '2024-01-15T15:00:00.000Z', 'plural unit')
  t.equal(s.ceil('quarter-hour').iso(), '2024-01-15T14:45:00.000Z', 'hyphenated unit')
  t.equal(s.iso(), '2024-01-15T14:37:12.345Z', 'original is unchanged')
  t.end()
})

test('floor is startOf', (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'America/Toronto')
  const units: TimeUnit[] = ['minute', 'quarterHour', 'hour', 'day', 'week', 'month', 'quarter', 'season', 'year', 'decade', 'century']
  units.forEach((unit) => {
    t.equal(s.floor(unit).epoch, s.startOf(unit).epoch, `floor(${unit})`)
  })
  t.equal(s.floor('hour').time(), '2:00pm', 'floor hour')
  t.end()
})

test('ceil, floor and nearest do not move a date on a boundary', (t) => {
  const s = spacetime('2024-01-15T14:00:00', 'UTC')
  t.equal(s.ceil('hour').time(), '2:00pm', 'ceil at 2:00pm')
  t.equal(s.floor('hour').time(), '2:00pm', 'floor at 2:00pm')
  t.equal(s.nearest('hour').time(), '2:00pm', 'nearest at 2:00pm')
  t.equal(s.next('hour').time(), '3:00pm', 'next still moves forward')
  const midnight = spacetime('2024-03-01T00:00:00', 'America/Toronto')
  ;(['day', 'month', 'season'] as TimeUnit[]).forEach((unit) => {
    t.equal(midnight.ceil(unit).epoch, midnight.epoch, `ceil(${unit}) on a boundary`)
    t.equal(midnight.floor(unit).epoch, midnight.epoch, `floor(${unit}) on a boundary`)
    t.equal(midnight.nearest(unit).epoch, midnight.epoch, `nearest(${unit}) on a boundary`)
  })
  t.end()
})

test('ceil, floor and nearest can be repeated without walking', (t) => {
  const units: TimeUnit[] = ['minute', 'quarterHour', 'hour', 'day', 'week', 'month', 'quarter', 'season', 'year']
  const zones = ['UTC', 'America/New_York', 'Australia/Lord_Howe', 'Asia/Kathmandu', 'Europe/London']
  const methods = ['ceil', 'floor', 'nearest'] as const
  const bad: string[] = []
  zones.forEach((tz) => {
    for (let i = 0; i < 60; i += 1) {
      const s = spacetime(Date.UTC(2026, 0, 1) + (i * 527999000) + (i % 3) * 137, tz)
      units.forEach((unit) => {
        methods.forEach((method) => {
          const once = s[method](unit)
          const twice = once[method](unit)
          // the result is a boundary, so every method agrees it is already there
          const settled = once.ceil(unit).epoch === once.epoch && once.floor(unit).epoch === once.epoch && once.nearest(unit).epoch === once.epoch
          const direction = (method !== 'ceil' || once.epoch >= s.epoch) && (method !== 'floor' || once.epoch <= s.epoch)
          if (twice.epoch !== once.epoch || !settled || !direction) {
            bad.push(`${tz} ${s.iso()} ${method}(${unit})`)
          }
        })
      })
    }
  })
  t.deepEqual(bad, [], 'every result is stable')
  t.end()
})

// (the bundled dst rules are 2027's)
test('ceil around dst changes', (t) => {
  // spring-forward: 1:30am est -> 3:00am edt
  let s = spacetime(Date.UTC(2027, 2, 14, 6, 30), 'America/New_York')
  t.equal(s.iso(), '2027-03-14T01:30:00.000-05:00', 'before spring-forward')
  t.equal(s.ceil('hour').iso(), '2027-03-14T03:00:00.000-04:00', 'over the skipped hour')
  t.equal(s.ceil('day').iso(), '2027-03-15T00:00:00.000-04:00', 'a 23-hour day')
  // fall-back: the first 1:30am -> the second 1:00am
  s = spacetime(Date.UTC(2027, 10, 7, 5, 30), 'America/New_York')
  t.equal(s.iso(), '2027-11-07T01:30:00.000-04:00', 'before fall-back')
  t.equal(s.ceil('hour').epoch, Date.UTC(2027, 10, 7, 6), 'into the repeated hour')
  t.equal(s.ceil('day').iso(), '2027-11-08T00:00:00.000-05:00', 'a 25-hour day')
  // lord howe repeats a half-hour, so one of its hours takes 90 minutes
  const bad: string[] = []
  for (let mins = 0; mins < 48 * 60; mins += 10) {
    s = spacetime(Date.UTC(2027, 3, 3) + mins * 60000, 'Australia/Lord_Howe')
    const up = s.ceil('hour')
    const moved = s.minute() === 0 ? up.epoch === s.epoch : up.epoch > s.epoch
    if (!moved || up.minute() !== 0 || up.ceil('hour').epoch !== up.epoch || up.epoch - s.epoch > 90 * 60000) {
      bad.push(`${s.iso()} -> ${up.iso()}`)
    }
  }
  t.deepEqual(bad, [], 'lord howe ceil lands on the next hour')
  t.end()
})

test('ceil and floor ignore bad input', (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  t.equal(s.ceil('foo' as TimeUnit).epoch, s.epoch, 'unknown ceil unit')
  t.equal(s.floor('foo' as TimeUnit).epoch, s.epoch, 'unknown floor unit')
  t.equal(spacetime('not a date').ceil('hour').isValid(), false, 'invalid ceil')
  t.equal(spacetime('not a date').floor('hour').isValid(), false, 'invalid floor')
  t.end()
})
