const test = require('tape')
const spacetime = require('./lib')

test('set quarter', (t) => {
  let s = spacetime('q1', 'Canada/Eastern')
  t.equal(s.monthName(), 'january', 'q1 .month()')
  t.equal(s.date(), 1, 'q1 .date()')

  s = spacetime('q2')
  t.equal(s.monthName(), 'april', 'q2 .month()')
  t.equal(s.date(), 1, 'q2 .date()')

  s = spacetime('q3')
  t.equal(s.monthName(), 'july', 'q3 .month()')
  t.equal(s.date(), 1, 'q2 .date()')

  s = spacetime('q4')
  t.equal(s.monthName(), 'october', 'q4 .month()')
  t.equal(s.date(), 1, 'q4 .date()')

  s = spacetime('q1 2001')
  t.equal(s.monthName(), 'january', 'q1 year .month()')
  t.equal(s.date(), 1, 'q1 year .date()')
  t.equal(s.year(), 2001, 'q1 .year()')

  s = spacetime('q1 of 1962')
  t.equal(s.monthName(), 'january', 'q1 year of .month()')
  t.equal(s.date(), 1, 'q1 year of .date()')
  t.equal(s.year(), 1962, 'q1 of .year()')

  t.end()
})
