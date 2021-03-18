const test = require('tape')
const spacetime = require('./lib')

test('isAwake', (t) => {
  let s = spacetime('March 26, 1999 13:42:00', 'Canada/Eastern')
  t.equal(s.isAwake(), true, 'awake')
  s = spacetime('March 26, 1999 23:42:00', 'Canada/Eastern')
  t.equal(s.isAwake(), false, 'sleeping')
  t.end()
})

test('asleep-test', (t) => {
  let s = spacetime.now()
  s = s.dayTime('night')
  t.equal(s.isAsleep(), true, 'sleeping at night')
  s = s.hour(2)
  t.equal(s.isAsleep(), true, 'sleeping at 2am')
  s = s.hour12(4)
  t.equal(s.isAsleep(), true, 'sleeping at 4am')
  s = s.dayTime('lunch')
  t.equal(s.isAsleep(), false, 'awake at lunch')
  s = s.hour24(14)
  t.equal(s.isAsleep(), false, 'awake at 2pm')
  s = s.dayTime('evening')
  t.equal(s.isAsleep(), false, 'awake at evening')
  t.end()
})

test('named-dates', (t) => {
  let christmas = spacetime('christmas', 'Canada/Eastern')
  let newYears = spacetime('new years', 'Canada/Eastern')
  t.equal(christmas.isBefore(newYears), true, 'christmas-is-before-new-years')
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

test('next', (t) => {
  let s = spacetime('Nov 2')
  s = s.next('month')
  t.equal(s.monthName(), 'december', 'dec')
  t.equal(s.date(), 1, 'dec 1')

  s = spacetime('Nov 23 1922')
  s = s.next('year')
  t.equal(s.monthName(), 'january', 'jan')
  t.equal(s.year(), 1923, 'now 1933')

  s = spacetime('Nov 23 1998')
  s = s.next('decade')
  t.equal(s.year(), 2000, 'now 2000')
  t.equal(s.monthName(), 'january', 'jan')
  t.end()
})

test('last', (t) => {
  let s = spacetime('Nov 2')
  s = s.last('month')
  t.equal(s.monthName(), 'october', 'oct')
  t.equal(s.date(), 1, 'oct 1')

  s = spacetime('Nov 23 1922')
  s = s.last('year')
  t.equal(s.monthName(), 'january', 'jan')
  t.equal(s.year(), 1921, 'now 1921')
  t.end()
})

test('offset', (t) => {
  let s = spacetime('Oct 12 2020', 'America/New_York')
  t.equal(s.offset(), -240, '-240 offset')

  s = spacetime('march 1 2020', 'America/New_York')
  t.equal(s.offset(), -300, '-300 offset')
  t.end()
})

test('week number', (t) => {
  //TODO: these should pass
  t.equal(spacetime('jan 1st 2018').week(), 1, '2018 first week') //monday
  t.equal(spacetime('jan 9th 2018').week(), 2, '2018 second week') //tuesday
  // t.equal(spacetime('jan 15th 2018').week(), 3, '2018 third week') //monday

  t.equal(spacetime('jan 1th 2019').week(), 1, '2019 first week') //tuesday
  // t.equal(spacetime('jan 9th 2019').week(), 2, '2019 second week') //wednesday
  // t.equal(spacetime('jan 15th 2019').week(), 3, '2019 third week') //tuesday
  t.end()
})

test('json', (t) => {
  let s = spacetime('2019-11-05T11:01:03.030-03:00')
  let json = s.format('json')
  let want = {
    century: 21,
    decade: 2010,
    year: 2019,
    month: 10,
    date: 5,
    day: 2,
    hour: 11,
    minute: 1,
    second: 3,
    millisecond: 30
  }
  Object.keys(want).forEach((k) => {
    t.equal(want[k], json[k], 'json-' + k)
  })
  t.end()
})

test('set-time rollover dst', (t) => {
  let s = spacetime('6 October 2019', 'australia/sydney').time('4:20am')
  t.equal(s.date(), 6, 'still the 6th')
  t.equal(s.time(), '4:20am', 'correct time')
  t.end()
})

test('day aliases', (t) => {
  let s = spacetime().day('thurs')
  t.equal(s.format('day'), 'Thursday', 'thurs')
  s = spacetime().day('tues')
  t.equal(s.format('day'), 'Tuesday', 'tues')
  t.end()
})
test('add fortnight', (t) => {
  let s = spacetime()
  let a = s.clone().add(2, 'fortnight')
  let b = s.clone().add(4, 'weeks')
  t.equal(a.iso(), b.iso(), 'fortnight')
  t.end()
})

test('test floats as inputs', (t) => {
  let num = 0.5
  let s = spacetime(null)
  s = s.date(num)
  s = s.hour(num)
  s = s.day(num)
  s = s.minute(num)
  s = s.year(num)
  s = s.second(num)
  s = s.add(num, 'hours')
  s = s.add(num, 'days')
  s = s.add(num, 'years')
  s = s.add(num, 'months')
  s = s.minus(num, 'quarter')
  t.ok(!s.isEqual(spacetime.now()), 'float-input')
  t.end()
})

test('apostrophe year', (t) => {
  let s = spacetime().year("'97").startOf('year')
  t.equal(s.format('iso-short'), '1997-01-01', "'97")

  s = spacetime().year("'13").startOf('year')
  t.equal(s.format('iso-short'), '2013-01-01', "'13")

  s = spacetime({ year: `'22`, month: 'feb' }).startOf('month')
  t.equal(s.format('iso-short'), '2022-02-01', 'apostrophe in object-input')
  t.end()
})

test('weird inputs', (t) => {
  let now = spacetime.now().add(1, 'millisecond')
  let isNull = spacetime(null)
  t.ok(isNull.isSame(now, 'hour'), 'null input')
  let isUndefined = spacetime(undefined)
  t.ok(isUndefined.isSame(now, 'hour'), 'Undefined input')
  let isFalse = spacetime(false)
  t.ok(isFalse.isSame(now, 'hour'), 'isFalse input')
  let isObj = spacetime({})
  t.ok(isObj.isSame(now, 'hour'), 'isObj input')
  let isArr = spacetime([])
  t.ok(isArr.isSame(now, 'hour'), 'isArr input')
  t.end()
})

test('min < max', (t) => {
  let min = spacetime.min('Canada/Pacific')
  let max = spacetime.max('Canada/Eastern')
  t.ok(min.isBefore(max), 'min < max')
  t.end()
})
