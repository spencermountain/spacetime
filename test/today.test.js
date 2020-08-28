const test = require('tape')
const spacetime = require('./lib')

test('change assumed year', function (t) {
  let today = {
    year: 1996
  }
  let s = spacetime('June 5th', null, { today: today })
  t.equal(s.format('nice-year'), 'Jun 5th, 1996', 'got year')
  t.end()
})

test('change assumed month', function (t) {
  let today = {
    month: 2
  }
  let s = spacetime('2019', null, { today: today })
  t.equal(s.format('nice-year'), 'Mar 1st, 2019', 'got month')
  t.end()
})

test('change assumed date', function (t) {
  let today = {
    date: 2
  }
  let s = spacetime('June 2020', null, { today: today })
  t.equal(s.format('nice-year'), 'Jun 2nd, 2020', 'got date')
  t.end()
})

test('null input w/ today', function (t) {
  let s = spacetime(null, null, { today: { year: 2012, month: 2 } })
  t.equal(s.format('nice-year'), 'Mar 1st, 2012', 'got date')

  s = spacetime('', 'Canada/Eastern', { today: { year: 1999, month: 0, date: 28 } })
  t.equal(s.format('nice-year'), 'Jan 28th, 1999', 'got date')

  t.end()
})

test('today methods works', function (t) {
  let today = {
    date: 2,
    month: 'feb',
    year: 2012
  }
  let s = spacetime.now(null, { today: today })
  t.equal(s.format('nice-year'), 'Feb 2nd, 2012', 'now method')
  s = spacetime.today(null, { today: today })
  t.equal(s.format('nice-year'), 'Feb 2nd, 2012', 'today method')
  s = spacetime.tomorrow(null, { today: today })
  t.equal(s.format('nice-year'), 'Feb 3rd, 2012', 'tomorrow method')
  s = spacetime.yesterday(null, { today: today })
  t.equal(s.format('nice-year'), 'Feb 1st, 2012', 'yesterday method')
  t.end()
})
