import test from 'tape'
import spacetime from '../../src/temporal/index.ts'
import type { BoundaryUnits } from '../../types/temporal-types.js'
const options = { skip: !globalThis.Temporal }

test('Temporal ceil goes to the next boundary', options, (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  const cases: [BoundaryUnits, string][] = [
    ['millisecond', '2024-01-15T14:37:12.345Z'],
    ['second', '2024-01-15T14:37:13.000Z'],
    ['minute', '2024-01-15T14:38:00.000Z'],
    ['quarter-hour', '2024-01-15T14:45:00.000Z'],
    ['hour', '2024-01-15T15:00:00.000Z'],
    ['day', '2024-01-16T00:00:00.000Z'],
    ['week', '2024-01-22T00:00:00.000Z'],
    ['month', '2024-02-01T00:00:00.000Z'],
    ['quarter', '2024-04-01T00:00:00.000Z'],
    ['year', '2025-01-01T00:00:00.000Z'],
    ['decade', '2030-01-01T00:00:00.000Z'],
    ['century', '2100-01-01T00:00:00.000Z']
  ]
  cases.forEach(([unit, iso]) => {
    t.equal(s.ceil(unit).iso(), iso, `ceil(${unit})`)
  })
  t.equal(s.ceil('hours').iso(), '2024-01-15T15:00:00.000Z', 'plural unit')
  t.equal(s.iso(), '2024-01-15T14:37:12.345Z', 'original is unchanged')
  t.end()
})

test('Temporal floor is startOf', options, (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'America/Toronto')
  const units: BoundaryUnits[] = ['second', 'minute', 'quarter-hour', 'hour', 'day', 'week', 'month', 'quarter', 'year', 'decade', 'century']
  units.forEach((unit) => {
    t.equal(s.floor(unit).epoch, s.startOf(unit).epoch, `floor(${unit})`)
  })
  t.equal(s.floor('hour').time(), '2:00pm', 'floor hour')
  t.end()
})

test('Temporal ceil, floor and nearest do not move a date on a boundary', options, (t) => {
  const s = spacetime('2024-01-15T14:00:00', 'UTC')
  t.equal(s.ceil('hour').time(), '2:00pm', 'ceil at 2:00pm')
  t.equal(s.floor('hour').time(), '2:00pm', 'floor at 2:00pm')
  t.equal(s.nearest('hour').time(), '2:00pm', 'nearest at 2:00pm')
  t.equal(s.next('hour').time(), '3:00pm', 'next still moves forward')
  // a nanosecond past the hour is not on the boundary
  const precise = spacetime('2024-01-15T14:00:00.000000001[UTC]')
  t.equal(precise.ceil('hour').iso(), '2024-01-15T15:00:00.000Z', 'sub-millisecond ceil')
  t.equal(precise.floor('hour').toTemporal().nanosecond, 0, 'sub-millisecond floor')
  t.end()
})

test('Temporal ceil, floor and nearest can be repeated without walking', options, (t) => {
  const units: BoundaryUnits[] = ['minute', 'quarter-hour', 'hour', 'day', 'week', 'month', 'quarter', 'year']
  const zones = ['UTC', 'America/New_York', 'Australia/Lord_Howe', 'Asia/Kathmandu', 'Europe/London']
  const methods = ['ceil', 'floor', 'nearest'] as const
  const bad: string[] = []
  const check = (epoch: number, tz: string) => {
    const s = spacetime(epoch, tz)
    units.forEach((unit) => {
      methods.forEach((method) => {
        const once = s[method](unit)
        const twice = once[method](unit)
        // the result is a boundary, so every method agrees it is already there
        const settled = methods.every((m) => once[m](unit).epoch === once.epoch)
        const direction = (method !== 'ceil' || once.epoch >= s.epoch) && (method !== 'floor' || once.epoch <= s.epoch)
        if (twice.epoch !== once.epoch || !settled || !direction) {
          bad.push(`${tz} ${s.iso()} ${method}(${unit})`)
        }
      })
    })
  }
  zones.forEach((tz) => {
    for (let i = 0; i < 60; i += 1) {
      check(Date.UTC(2026, 0, 1) + (i * 527999000) + (i % 3) * 137, tz)
    }
  })
  // every ten minutes through lord howe's repeated half-hour
  for (let mins = 0; mins < 240; mins += 10) {
    check(Date.UTC(2026, 3, 4, 13) + mins * 60000, 'Australia/Lord_Howe')
  }
  t.deepEqual(bad, [], 'every result is stable')
  t.end()
})

test('Temporal ceil around dst changes', options, (t) => {
  // spring-forward: 1:30am est -> 3:00am edt
  let s = spacetime(Date.UTC(2026, 2, 8, 6, 30), 'America/New_York')
  t.equal(s.ceil('hour').iso(), '2026-03-08T03:00:00.000-04:00', 'over the skipped hour')
  t.equal(s.ceil('day').iso(), '2026-03-09T00:00:00.000-04:00', 'a 23-hour day')
  // fall-back: the first 1:30am -> the second 1:00am
  s = spacetime(Date.UTC(2026, 10, 1, 5, 30), 'America/New_York')
  t.equal(s.ceil('hour').iso(), '2026-11-01T01:00:00.000-05:00', 'into the repeated hour')
  t.equal(s.ceil('day').iso(), '2026-11-02T00:00:00.000-05:00', 'a 25-hour day')
  // lord howe repeats a half-hour, so 1:00 -> 2:00 takes 90 minutes
  s = spacetime(Date.UTC(2026, 3, 4, 15, 10), 'Australia/Lord_Howe')
  t.equal(s.iso(), '2026-04-05T01:40:00.000+10:30', 'in the repeated half-hour')
  t.equal(s.floor('hour').iso(), '2026-04-05T01:00:00.000+11:00', 'lord howe floor')
  t.equal(s.ceil('hour').iso(), '2026-04-05T02:00:00.000+10:30', 'lord howe ceil')
  t.equal(s.nearest('hour').iso(), '2026-04-05T02:00:00.000+10:30', 'lord howe nearest')
  t.end()
})

test('Temporal ceil and floor ignore bad input', options, (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  t.equal(s.ceil('foo' as BoundaryUnits).epoch, s.epoch, 'unknown ceil unit')
  t.equal(s.floor('foo' as BoundaryUnits).epoch, s.epoch, 'unknown floor unit')
  t.equal(spacetime('not a date').ceil('hour').isValid(), false, 'invalid ceil')
  t.equal(spacetime('not a date').floor('hour').isValid(), false, 'invalid floor')
  t.end()
})
