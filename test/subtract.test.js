import test from 'tape'
import spacetime from './lib/index.js'

//
test('subtract', (t) => {
  let s = spacetime('January 1, 2016 1:20:05', 'Canada/Eastern')
  //initial state
  t.equal(s.date(), 1, '.date()')
  t.equal(s.month(), 0, '.month()')
  t.equal(s.year(), 2016, '.year()')
  t.equal(s.hour(), 1, '.hour()')
  t.equal(s.minute(), 20, '.minute()')

  s = s.subtract(1, 'month')
  t.equal(s.date(), 1, 'movemonth.date()')
  t.equal(s.month(), 11, 'movemonth.month()')
  t.equal(s.year(), 2015, 'movemonth.year()')

  s = s.subtract(2, 'days')
  t.equal(s.date(), 29, 'moveday.date()')
  t.equal(s.monthName(), 'november', 'moveday.month()')
  t.equal(s.year(), 2015, 'moveday.year()')
  t.equal(s.dayName(), 'sunday', 'moveday.day()')

  s = s.subtract(1, 'week')
  t.equal(s.date(), 22, 'moveweek.date()')
  t.equal(s.monthName(), 'november', 'moveweek.month()')
  t.equal(s.year(), 2015, 'moveweek.year()')
  t.equal(s.dayName(), 'sunday', 'moveweek.day()')

  s = s.subtract(1, 'year')
  t.equal(s.date(), 22, 'moveyear.date()')
  t.equal(s.monthName(), 'november', 'moveyear.month()')
  t.equal(s.year(), 2014, 'moveyear.year()')

  t.end()
})

test('subtract-rollover', (t) => {
  const s = spacetime('January 1, 2010 1:20:05', 'Canada/Pacific')

  let tmp = s.clone()
  tmp = tmp.subtract(8, 'hour')
  t.equal(tmp.year(), 2009, 'minus-8-hours')

  tmp = s.clone()
  tmp = tmp.subtract(3, 'day')
  t.equal(tmp.year(), 2009, 'minus-3-days')

  tmp = s.clone()
  tmp = tmp.subtract(1, 'month')
  t.equal(tmp.year(), 2009, 'minus-1-month')

  tmp = s.clone()
  tmp = tmp.subtract(4, 'month')
  t.equal(tmp.year(), 2009, 'minus-4-months-still-1-year')

  tmp = s.clone()
  tmp = tmp.subtract(13, 'month')
  t.equal(tmp.year(), 2008, 'minus-13-months-2-years')

  tmp = s.clone()
  tmp = tmp.subtract(0, 'month')
  t.equal(tmp.year(), 2010, 'minus-0-months-0-years')
  t.equal(tmp.monthName(), s.monthName(), '0-months-same-month')
  t.equal(tmp.date(), s.date(), '0-months-same-date')

  tmp = s.clone()
  tmp = tmp.subtract(12, 'month')
  t.equal(tmp.year(), 2009, 'minus-12-months-1-years')
  t.equal(tmp.monthName(), s.monthName(), '12-months-same-month')
  t.equal(tmp.date(), s.date(), '12-months-same-date')

  tmp = s.clone()
  tmp = tmp.subtract(120, 'month')
  t.equal(tmp.year(), 2000, 'minus-120-months-10-years')
  t.equal(tmp.monthName(), s.monthName(), 'same-month')
  t.equal(tmp.date(), s.date(), 'same-date')

  t.end()
})



test('month-rollover even', (t) => {
  const s = spacetime('jan 1 2022')

  let a = s.subtract(0, 'month');
  t.equal(a.format('iso-short'), '2022-01-01', '0 years even')

  a = s.subtract(12, 'month');
  t.equal(a.format('iso-short'), '2021-01-01', '1 years even')

  a = s.subtract(24, 'month');
  t.equal(a.format('iso-short'), '2020-01-01', '2 years even')

  a = s.subtract(36, 'month');
  t.equal(a.format('iso-short'), '2019-01-01', '3 years even')

  a = s.subtract(48, 'month');
  t.equal(a.format('iso-short'), '2018-01-01', '4 years even')
  t.end()
})

test('month-rollover + 1', (t) => {
  const s = spacetime('jan 1 2022')

  let a = s.subtract(1, 'month');
  t.equal(a.format('iso-short'), '2021-12-01', '0 years +1m')

  a = s.subtract(13, 'month');
  t.equal(a.format('iso-short'), '2020-12-01', '1 years +1m')

  a = s.subtract(25, 'month');
  t.equal(a.format('iso-short'), '2019-12-01', '2 years +1m')

  a = s.subtract(37, 'month');
  t.equal(a.format('iso-short'), '2018-12-01', '3 years +1m')

  a = s.subtract(49, 'month');
  t.equal(a.format('iso-short'), '2017-12-01', '4 years +1m')
  t.end()
})
