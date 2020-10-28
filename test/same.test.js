const test = require('tape')
const spacetime = require('./lib')

test('isSame', (t) => {
  let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  let b = a.clone()
  t.equal(a.isSame(b, 'hour'), true, 'same-hour')
  t.equal(a.isSame(b, 'day'), true, 'same-day')
  t.equal(a.isSame(b, 'week'), true, 'same-week')
  t.equal(a.isSame(b, 'month'), true, 'same-month')
  t.equal(a.isSame(b, 'quarter'), true, 'same-quarter')
  t.equal(a.isSame(b, 'year'), true, 'same-year')

  b = b.add(2, 'hours')
  t.equal(a.isSame(b, 'hour'), false, 'same-hour')
  t.equal(a.isSame(b, 'day'), true, 'same-day')
  t.equal(a.isSame(b, 'month'), true, 'same-month')
  t.equal(a.isSame(b, 'year'), true, 'same-year')

  b = b.subtract(2, 'days')
  t.equal(a.isSame(b, 'hour'), false, 'same-hour')
  t.equal(a.isSame(b, 'day'), false, 'same-day')
  t.equal(a.isSame(b, 'month'), true, 'same-month')
  t.equal(a.isSame(b, 'year'), true, 'same-year')

  b = b.subtract(30, 'days')
  t.equal(a.isSame(b, 'hour'), false, 'same-hour')
  t.equal(a.isSame(b, 'day'), false, 'same-day')
  t.equal(a.isSame(b, 'month'), false, 'same-month')
  t.equal(a.isSame(b, 'year'), true, 'same-year')

  b = b.year(2020)
  t.equal(a.isSame(b, 'hour'), false, 'same-hour')
  t.equal(a.isSame(b, 'day'), false, 'same-day')
  t.equal(a.isSame(b, 'month'), false, 'same-month')
  t.equal(a.isSame(b, 'year'), false, 'same-year')

  t.end()
})

test('isSame - timezones', (t) => {
  let start = spacetime('jan 1st 2020 2:00pm', 'Canada/Pacific') //.add(5, 'minutes')
  let end = spacetime('jan 1st 2020 2:00pm', 'Canada/Eastern')
  t.equal(start.isSame(end, 'hour'), false, '2pm est != 2pm pst')

  let east = spacetime('oct 1st 2020 11:00am', 'Canada/Eastern')
  let west = spacetime('oct 1st 2020 8:00am', 'Canada/Pacific')
  t.equal(east.isSame(west, 'hour'), true, '11am est == 8am pst')
  t.equal(west.isSame(east, 'hour'), true, '11am == 8pm reversed')

  let a = spacetime('oct 1st 2020 2:32pm', 'America/Catamarca')
  let b = spacetime('oct 1st 2020 2:32pm', 'America/Cayenne')
  t.equal(a.isSame(b, 'hour'), true, 'diff timezones, same offset')

  // ignore timezone differences
  t.equal(start.isSame(end, 'hour', false), true, 'tzSensitivity off')

  t.end()
})
