const test = require('tape')
const spacetime = require('./lib')

test('get', (t) => {
  let s = spacetime('February 22, 2017 15:30:00', 'Canada/Eastern')
  t.equal(s.date(), 22, '.date()')
  t.equal(s.year(), 2017, '.year()')
  t.equal(s.quarter(), 1, '.quarter()')
  t.equal(s.hour(), 15, '.hour()')
  t.equal(s.ampm(), 'pm', '.ampm()')
  t.equal(s.hourFloat(), 15.5, '.hourFloat()')
  t.equal(s.minute(), 30, '.minute()')
  t.equal(s.season(), 'winter', '.season()')
  t.equal(s.monthName(), 'february', '.month()')
  t.equal(s.dayName(), 'wednesday', '.day()')
  t.end()
})

test('get-quarters', (t) => {
  let s = spacetime('January 22, 2017 15:42:00', 'Canada/Eastern')
  t.equal(s.quarter(), 1, '.quarter()')

  s = s.month(1)
  t.equal(s.quarter(), 1, '.quarter()')

  s = s.month('march')
  t.equal(s.quarter(), 1, '.quarter()')

  s = s.month(3)
  t.equal(s.quarter(), 2, '.quarter()')

  s = s.month('december')
  t.equal(s.quarter(), 4, '.quarter()')
  t.end()
})

test('get-weeks', (t) => {
  let s = spacetime('January 1, 2015 2:00:00', 'Canada/Eastern')
  t.equal(s.week(), 1, '.weeks()1')

  // s = s.month(1)
  // t.equal(s.week(), 4, '.weeks()2')

  s = s.month('december')
  s = s.date(29)
  t.equal(s.week(), 53, '.weeks()3') //maybe change
  t.end()
})

test('day-of-year', (t) => {
  let s = spacetime('January 5, 2017 2:00:00', 'Canada/Eastern')
  t.equal(s.ampm(), 'am', '.date()')
  t.equal(s.date(), 5, '.date()')
  t.equal(s.dayOfYear(), 5, 'jan-5th()')

  s = spacetime('February 1, 2017 2:00:00', 'Canada/Eastern')
  t.equal(s.dayOfYear(), 32, 'feb 1()')

  s = spacetime('February 11, 2017 2:00:00', 'Canada/Eastern')
  t.equal(s.dayOfYear(), 42, 'feb 1()')

  //after feb29th, there could be a leapyear
  // s = spacetime('December 31, 2017 2:00:00', 'Canada/Eastern');
  // t.equal(s.dayOfYear(), 364, 'December 31()');

  t.end()
})
