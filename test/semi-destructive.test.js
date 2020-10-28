const test = require('tape')
const spacetime = require('./lib')

test('non-destructive', (t) => {
  let s = spacetime([2017, 5, 25])
  s = s.seconds(5)
  s = s.year(2025)
  t.equal(s.date(), 25, 'init-date')
  t.equal(s.seconds(), 5, 'still-5-seconds')

  //but this method 0's-out things:
  s = s.quarter('q2')
  t.equal(s.date(), 1, 'moved-date')
  t.equal(s.seconds(), 0, 'now-not-5-seconds')
  t.end()
})

test('semi-destructive', (t) => {
  let s = spacetime('June 12, 2017 20:01:00', 'Australia/Brisbane')
  t.equal(s.date(), 12, 'date-init')
  s = s.month('march')
  t.equal(s.monthName(), 'march', 'now-march')
  t.equal(s.date(), 12, 'still-12th')

  s = spacetime('June 30, 2017 20:01:00', 'Australia/Brisbane')
  t.equal(s.date(), 30, 'date-init')
  s = s.month('february')
  t.equal(s.monthName(), 'february', 'now-february')
  //close-as-possible
  t.equal(s.date(), 28, 'now-28th')

  t.end()
})
