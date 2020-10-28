const test = require('tape')
const spacetime = require('./lib')

const fmt = (s) => {
  return s.format('nice-short')
}

test('leapyear-basic', (t) => {
  let d = spacetime('December 12, 2016 20:42:00', 'Africa/Algiers')
  t.equal(d.leapYear(), true, '2016-leap')

  d = spacetime('April 12, 2020 10:42:00', 'Canada/Pacific')
  t.equal(d.leapYear(), true, '2020-leap')

  d = spacetime('April 12, 2024 10:42:00', 'Canada/Eastern')
  t.equal(d.leapYear(), true, '2024-leap')

  d = spacetime('April 12, 2018 10:42:00', 'Canada/Eastern')
  t.equal(d.leapYear(), false, '2018-not-leap')

  d = spacetime('April 12, 2019 10:42:00', 'Canada/Pacific')
  t.equal(d.leapYear(), false, '2019-not-leap')

  d = spacetime('April 12, 2023 10:42:00', 'Africa/Algiers')
  t.equal(d.leapYear(), false, '2023-not-leap')

  t.end()
})

test('leapyear-in-add', (t) => {
  let d = spacetime('December 1, 2000 20:42:00', 'Africa/Algiers')
  let first = d.clone()

  d = d.add(365, 'day')
  t.equal(d.leapYear(), false, 'not-leap-1')
  t.equal(fmt(first), fmt(d), 'same-day-1')

  d = d.add(365, 'day')
  t.equal(d.leapYear(), false, 'not-leap-2')
  t.equal(fmt(first), fmt(d), 'same-day-2')

  d = d.add(365, 'day')
  t.equal(d.leapYear(), false, 'not-leap-3')
  t.equal(fmt(first), fmt(d), 'same-day-3')

  d = d.add(365, 'day')
  t.equal(d.leapYear(), true, 'leap-4')
  t.notEqual(fmt(first), fmt(d), 'same-day-4')

  t.end()
})

test('add-1-day-adds-25-hours', (t) => {
  let d = spacetime(1509858000000, 'Canada/Eastern')
  t.equal(d.date(), 5, 'is 5th')
  d = d.add(1, 'date')
  t.equal(d.date(), 6, 'now 6th')
  d = d.add(1, 'date')
  t.equal(d.date(), 7, 'now 7th')
  t.end()
})

test('feb-29th-exists', (t) => {
  let leaps = [2004, 2008, 2012, 2016, 2020, 2024]
  leaps.forEach((y) => {
    //feb 28th 11:30pm
    let s = spacetime([y, 1, 28, 23, 30], 'Africa/Algiers')
    s = s.add(1, 'hour')
    t.equal(s.format('nice-short'), 'Feb 29th, 12:30am', 'forward into leapday on ' + y)
    //march 1st 5:30pm
    s = spacetime([y, 2, 1, 17, 30], 'Canada/Mountain')
    s = s.subtract(1, 'day')
    t.equal(s.format('nice-short'), 'Feb 29th, 5:30pm', 'backward into leapday on ' + y)
  })
  t.end()
})

test('feb-29th-doesnt-exist', (t) => {
  let noLeaps = [2005, 2009, 2010, 2011, 2013, 2017, 2019, 2021]
  noLeaps.forEach((y) => {
    //feb 28th 11:30pm
    let s = spacetime([y, 1, 28, 23, 30], 'Africa/Algiers')
    s = s.add(1, 'hour')
    t.equal(s.format('nice-short'), 'Mar 1st, 12:30am', 'no leap on ' + y)
    //march 1st 5:30pm
    s = spacetime([y, 2, 1, 17, 30], 'Canada/Eastern')
    s = s.subtract(1, 'day')
    t.equal(s.format('nice-short'), 'Feb 28th, 5:30pm', 'backward with no leapday on ' + y)
  })
  t.end()
})

test('length of year', (t) => {
  let right = {
    2014: 365,
    2015: 365,
    2016: 366,
    2017: 365,
    2018: 365,
    2019: 365,
    2020: 366,
    2021: 365,
    2022: 365,
    2023: 365,
    2024: 366,
    2025: 365,
    2026: 365,
    2027: 365,
    2028: 366
  }
  for (let i = 0; i < 15; i++) {
    let year = 2014 + i
    let s = spacetime({
      year
    }).endOf('year')
    t.equal(s.dayOfYear(), right[year], 'year ' + year)
  }
  t.end()
})

test('set feb 29th in leap year', (t) => {
  let s = spacetime.now()
  s = s.year(2020)
  s = s.month(1)
  s = s.date(29)
  t.equal(s.format('iso-short'), '2020-02-29', 'is leap day')
  t.end()
})

test('set feb 29th in non-leap year', (t) => {
  let s = spacetime.now()
  s = s.year(2019)
  s = s.month(1)
  s = s.date(29)
  t.equal(s.format('iso-short'), '2019-02-28', 'is not leap day')
  t.end()
})
