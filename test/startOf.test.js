const test = require('tape')
const spacetime = require('./lib')

test('start of month', (t) => {
  let d = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  d = d.startOf('month')

  let monthStart = spacetime('March 1, 1999 00:00:00', 'Canada/Eastern')
  monthStart = monthStart.milliseconds(0)

  t.equal(d.isEqual(monthStart), true, 'month-start')
  t.equal(d.isSame(monthStart, 'day'), true, 'same-day')
  t.equal(d.isSame(monthStart, 'month'), true, 'same-month')
  t.equal(d.isSame(monthStart, 'year'), true, 'same-year')
  t.equal(d.date(), 1, 'first day')
  t.equal(d.hour(), 0, 'first hour')

  t.end()
})

test('start of quarterHour', (t) => {
  let d = spacetime('March 28, 1999 8:42:12', 'Canada/Eastern')
  d = d.startOf('quarterHour')
  t.equal(d.time(), '8:30am', 'quarterHour-start')

  d = spacetime('March 28, 1999 20:00:12', 'Canada/Pacific')
  d = d.startOf('quarterHour')
  t.equal(d.time(), '8:00pm', 'quarterHour-start2')

  let s = spacetime([2019, 4, 8, 10, 11, 12])
  s = s.time('3:29pm')
  s = s.startOf('quarter-hour')
  t.equal(s.format('time'), '3:15pm', 'start-quarterhour-3')

  s = s.time('3:20pm')
  s = s.endOf('quarter-hour')
  t.equal(s.format('time'), '3:29pm', 'end-quarter-hour')
  t.end()
})

test('start of winter', (t) => {
  let d = spacetime('January 28, 2017 20:42:00', 'Canada/Pacific')
  d = d.startOf('season')

  let start = spacetime('December 1, 2016 00:00:00', 'Canada/Pacific')
  start = start.millisecond(0)
  t.equal(d.isEqual(start), true, 'month-is-exactly-start')

  t.equal(d.isSame(start, 'day'), true, 'same-day')
  t.equal(d.isSame(start, 'month'), true, 'same-month')
  t.equal(d.isSame(start, 'year'), true, 'same-year')
  t.equal(d.date(), 1, 'first day')
  t.equal(d.hour(), 0, 'first hour')
  t.equal(d.minute(), 0, 'first minute')
  t.equal(d.second(), 0, 'first second')

  t.end()
})

test('end of day', (t) => {
  let d = spacetime('March 28, 1999 20:42:00', 'Africa/Algiers')
  d = d.endOf('month')

  let tmp = d.clone()
  tmp = tmp.add(1, 'second')
  t.equal(d.isSame(tmp, 'day'), false, '1-millisecond-changes day')

  let end = spacetime('March 31, 1999 23:59:59', 'Africa/Algiers')
  end = end.millisecond(999)
  t.equal(d.isEqual(end), true, 'day-is-exactly-end')

  t.equal(d.isSame(end, 'day'), true, 'same-day')
  t.equal(d.isSame(end, 'month'), true, 'same-month')
  t.equal(d.isSame(end, 'year'), true, 'same-year')
  t.equal(d.date(), 31, 'last day')
  t.equal(d.hour(), 23, 'last hour')
  t.equal(d.minute(), 59, 'last minute')
  t.equal(d.second(), 59, 'last second')

  t.end()
})

test('end of decade', (t) => {
  let a = spacetime('Nov 23 1999').endOf('decade')
  let b = spacetime('Nov 12 1992').endOf('decade')
  t.equal(a.epoch, b.epoch, 'both same time')
  t.equal(a.format('month'), 'December', 'December')
  t.equal(b.date(), 31, 'is new-years')
  t.equal(b.year(), 1999, 'is y2k')
  t.end()
})

test('start-end are idempodent', (t) => {
  let units = ['day', 'week', 'month', 'quarter', 'season', 'year']
  units.forEach((unit) => {
    let s = spacetime('December 31, 1999 23:59:58', 'Africa/Algiers')
    let a = s.clone().endOf(unit)
    let b = a.clone().endOf(unit)
    let c = b.clone().endOf(unit)
    let d = c.clone().endOf(unit)
    t.equal(a.isEqual(d), true, unit + '-is-idempodent')
  })
  t.end()
})

test('startof is idempodent', (t) => {
  let units = ['hour', 'minute', 'day', 'week', 'month', 'year', 'quarter', 'season']
  units.forEach((unit) => {
    let a = spacetime('2020-06-01').startOf(unit)
    let b = a.clone()
    for (let i = 0; i < 14; i += 1) {
      b = b.startOf(unit)
    }
    t.equal(a.iso(), b.iso(), unit + ' idempodent')
  })
  t.end()
})

test('endof is idempodent', (t) => {
  let units = ['hour', 'minute', 'day', 'week', 'month', 'year', 'quarter', 'season']
  units.forEach((unit) => {
    let a = spacetime('2020-06-01').endOf(unit)
    let b = a.clone()
    for (let i = 0; i < 7; i += 1) {
      b = b.endOf(unit)
    }
    t.equal(a.iso(), b.iso(), unit + ' idempodent')
  })
  t.end()
})

test('startof + minus = startof', (t) => {
  let units = ['hour', 'minute', 'day', 'week', 'month', 'year', 'quarter', 'season']
  units.forEach((unit) => {
    let s = spacetime('2020-10-01').startOf(unit)
    s = s.minus(1, unit)
    let minus = s.iso()

    s = s.startOf(unit)
    let startOf = s.iso()
    t.equal(minus, startOf, unit + ' start/minus')
  })
  t.end()
})
