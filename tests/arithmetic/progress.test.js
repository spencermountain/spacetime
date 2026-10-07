import test from 'tape'
import spacetime from '../_lib/index.js'

test('progress', (t) => {
  let d = spacetime('December 31, 1999 23:59:58', 'Canada/Eastern')
  let obj = d.progress()
  t.ok(obj.year > 0.95, 'almost-done-year')
  t.ok(obj.quarter > 0.9, 'almost-done-quarter')
  t.ok(obj.month > 0.9, 'almost-done-month')
  t.ok(obj.week > 0.7, 'almost-done-week') //friday
  t.ok(obj.day > 0.95, 'almost-done-day')
  t.ok(obj.quarterHour > 0.9, 'almost-done-hour')
  t.ok(obj.hour > 0.95, 'almost-done-hour')
  t.ok(obj.minute > 0.95, 'almost-done-minute')

  d = d.startOf('year')
  obj = d.progress()
  t.ok(obj.year <= 0.1, 'just-starting-year')
  t.ok(obj.month <= 0.1, 'just-starting-month')
  t.ok(obj.day <= 0.1, 'just-starting-day')
  t.ok(obj.hour <= 0.1, 'just-starting-hour')
  t.ok(obj.minute <= 0.1, 'just-starting-minute')
  t.end()
})

test('progress-param', (t) => {
  const s = spacetime('jan 2 2019', 'Canada/Eastern')
  t.equal(s.progress('year'), 0, 'start-year')
  t.equal(s.progress('month'), 0.03, 'early-month')
  t.end()
})


test('progress measures exact fractions in UTC', (t) => {
  const cases = [
    ['2024-01-01T00:00:00Z', 'year', 0],
    ['2024-01-15T00:00:00Z', 'day', 0],
    ['2024-01-15T06:00:00Z', 'day', 0.25],
    ['2024-01-15T12:00:00Z', 'day', 0.5],
    ['2024-01-15T10:00:00Z', 'hour', 0],
    ['2024-01-15T10:15:00Z', 'hour', 0.25],
    ['2024-01-15T10:30:00Z', 'hour', 0.5],
    ['2024-01-15T10:00:15Z', 'minute', 0.25],
    ['2024-01-15T10:00:30Z', 'minute', 0.5],
    ['2024-04-08T12:00:00Z', 'month', 0.25],
    ['2024-04-16T00:00:00Z', 'month', 0.5],
    ['2024-01-08T18:00:00Z', 'month', 0.25],
    ['2024-01-16T12:00:00Z', 'month', 0.5],
    ['2023-02-08T00:00:00Z', 'month', 0.25],
    ['2023-02-15T00:00:00Z', 'month', 0.5],
    ['2024-02-08T06:00:00Z', 'month', 0.25],
    ['2024-02-15T12:00:00Z', 'month', 0.5],
    ['2023-07-02T12:00:00Z', 'year', 0.5],
    ['2024-07-02T00:00:00Z', 'year', 0.5]
  ]
  cases.forEach(([input, unit, expected]) => {
    const s = spacetime(input, 'UTC')
    const label = `${input} UTC: progress(${unit})`
    t.equal(s.progress(unit), expected, label)
    t.equal(s.progress()[unit], expected, `${label} agrees with the object form`)
  })
  t.end()
})
