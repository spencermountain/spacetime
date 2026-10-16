import test from 'tape'
import spacetime from '../_lib/index.js'

test('nearest', (t) => {
  const s = spacetime('jan 2 2019', 'Canada/Eastern')
  const month = s.nearest('month')
  const year = s.nearest('year')
  const quarter = s.nearest('quarter')
  t.equal(month.format('iso'), year.format('iso'), 'nearest year=nearest month')
  t.equal(quarter.format('iso'), year.format('iso'), 'nearest quarter=nearest month')
  t.end()
})

test('nearest-time', (t) => {
  let s = spacetime('feb 20 2017', 'Canada/Pacific')
  s = s.time('3:29am')
  const hour = s.nearest('hour')
  t.equal(hour.format('time'), '3:00am', 'close-call nearest-hour')
  t.end()
})

test('nearest-quarter-hour', (t) => {
  let s = spacetime([2019, 4, 8, 10, 11, 12], 'Canada/Eastern')
  s = s.nearest('quarter-hour')
  t.equal(s.format('iso'), '2019-05-08T10:15:00.000-04:00', 'nearest-quarterhour')
  t.end()
})

test('nearest', (t) => {
  let s = spacetime('Nov 2')
  s = s.nearest('month')
  t.equal(s.monthName(), 'november', 'nov')
  t.equal(s.date(), 1, 'nov 1')

  s = spacetime('Nov 23')
  s = s.nearest('month')
  t.equal(s.monthName(), 'december', 'dec')
  t.equal(s.date(), 1, 'dec 1')
  t.end()
})


test('nearest rounds around midpoints and calendar boundaries', (t) => {
  // Exact midpoint ties preserve the earlier boundary.
  const cases = [
    ['2024-01-15T03:29:59.999Z', 'hour', '2024-01-15T03:00:00.000Z'],
    ['2024-01-15T03:30:00.000Z', 'hour', '2024-01-15T03:00:00.000Z'],
    ['2024-01-15T03:30:00.001Z', 'hour', '2024-01-15T04:00:00.000Z'],
    ['2024-01-15T10:07:29.999Z', 'quarter-hour', '2024-01-15T10:00:00.000Z'],
    ['2024-01-15T10:07:30.000Z', 'quarter-hour', '2024-01-15T10:00:00.000Z'],
    ['2024-01-15T10:07:30.001Z', 'quarter-hour', '2024-01-15T10:15:00.000Z'],
    ['2024-01-15T11:59:59.999Z', 'day', '2024-01-15T00:00:00.000Z'],
    ['2024-01-15T12:00:00.000Z', 'day', '2024-01-15T00:00:00.000Z'],
    ['2024-01-15T12:00:00.001Z', 'day', '2024-01-16T00:00:00.000Z'],
    ['2024-01-15T23:45:00.000Z', 'hour', '2024-01-16T00:00:00.000Z'],
    ['2024-12-31T23:45:00.000Z', 'hour', '2025-01-01T00:00:00.000Z'],
    ['2024-12-31T23:59:40.000Z', 'minute', '2025-01-01T00:00:00.000Z'],
    ['2024-12-31T12:00:00.000Z', 'month', '2025-01-01T00:00:00.000Z'],
    ['2024-01-15T03:00:00.000Z', 'hour', '2024-01-15T03:00:00.000Z']
  ]
  cases.forEach(([input, unit, expected]) => {
    const s = spacetime(input, 'UTC')
    const result = s.nearest(unit)
    const label = `${input} UTC: nearest(${unit})`
    t.equal(result.iso(), expected, label)
    t.equal(s.epoch, Date.parse(input), `${label} preserves the original`)
  })
  t.end()
})
