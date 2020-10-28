const test = require('tape')
const spacetime = require('./lib')

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
  let s = spacetime('jan 2 2019', 'Canada/Eastern')
  t.equal(s.progress('year'), 0, 'start-year')
  t.equal(s.progress('month'), 0.03, 'early-month')
  t.end()
})
