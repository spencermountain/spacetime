const test = require('tape')
const spacetime = require('./lib')

test('add', (t) => {
  let s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern')
  //initial state
  t.equal(s.date(), 1, '.date()')
  t.equal(s.monthName(), 'january', '.month()')
  t.equal(s.year(), 2017, '.year()')
  t.equal(s.hour(), 1, '.hour()')
  t.equal(s.minute(), 20, '.minute()')
  t.equal(s.dayName(), 'sunday', '.day()')

  s = s.add(1, 'hour')
  t.equal(s.hour(), 2, 'movehour-.hour()')
  t.equal(s.minute(), 20, 'movehour-.minute()')
  t.equal(s.date(), 1, 'movehour-.date()')
  t.equal(s.month(), 0, 'movehour-.month()')
  t.equal(s.year(), 2017, 'movehour-.year()')

  s = s.add(1, 'month')
  t.equal(s.date(), 1, 'movemonth.date()')
  t.equal(s.monthName(), 'february', 'movemonth.month()')
  t.equal(s.year(), 2017, 'movemonth.year()')

  s = s.add(2, 'days')
  t.equal(s.date(), 3, 'moveday-.date()')
  t.equal(s.monthName(), 'february', 'moveday-.month()')
  t.equal(s.year(), 2017, 'moveday-.year()')
  t.equal(s.dayName(), 'friday', 'moveday-.day()')

  s = s.add(1, 'week')
  t.equal(s.date(), 10, 'moveweek-.date()')
  t.equal(s.monthName(), 'february', 'moveweek-.month()')
  t.equal(s.year(), 2017, 'moveweek-.year()')
  t.equal(s.dayName(), 'friday', 'moveweek-.day()')

  s = s.add(1, 'year')
  t.equal(s.date(), 10, 'moveyear.date()')
  t.equal(s.monthName(), 'february', 'moveyear.month()')
  t.equal(s.year(), 2018, 'moveyear.year()')

  s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern')
  // s.add(1, 'quarter');
  // t.equal(s.date(), 1, 'movequarter.date()');
  // t.equal(s.monthName(), 'april', 'movequarter.date()');
  s = s.add(2, 'years')
  t.equal(s.date(), 1, 'moveyear-.date()')
  // t.equal(s.monthName(), 'april', 'moveyear.month()');
  t.equal(s.year(), 2019, 'moveyear.year()')

  s = s.add(1, 'decade')
  t.equal(s.year(), 2029, 'move-decade.year()')

  s = s.add(1, 'quarterHour')
  t.equal(s.minute(), 35, 'movequarterHour')

  s = s.add(1, 'quarterHour')
  t.equal(s.minute(), 50, 'movequarterHour#2')

  s = s.time('3:31pm')
  s = s.add(4, 'quarter-hour')
  t.equal(s.time(), '4:31pm', 'add 2 quarter-hours')

  t.end()
})

test('adding 0 changes nothing', (t) => {
  let s = spacetime.now()
  let a = s.clone()
  s = s.add(0, 'month')
  s = s.add(0, 'day')
  s = s.add(0, 'week')
  s = s.add(0, 'year')
  s = s.add(0, 'hour')
  s = s.add(0, 'minute')
  s = s.minus(0, 'minute')
  s = s.minus(0, 'days')
  t.equal(s.epoch, a.epoch, 'time-didnt change')

  s = spacetime('dec 25 2018')
  let before = s.format('nice-year')
  s = s.add(0, 'years')
  t.equal(s.format('nice-year'), before, 'year didnt change')
  t.end()
})

test('hour-tricky', (t) => {
  let s = spacetime('January 1, 2017 13:20:00', 'Canada/Pacific')
  t.equal(s.hour(), 13, 'init.hour()')
  t.equal(s.minute(), 20, 'init.minute()')

  s = s.add(1, 'hour')
  t.equal(s.hour(), 14, '.hour()')
  t.equal(s.minute(), 20, '.minute()')
  t.end()
})

test('day-tricky', (t) => {
  let d = spacetime('2019-11-04T00:00:00.000', 'Canada/Eastern')
  d = d.add(1, 'week')
  t.equal(d.format('nice-day'), 'Mon Nov 11th', 'add week over dst-change')

  //same thing, but days
  d = spacetime('2019-11-04T00:00:00.000', 'Canada/Eastern')
  d = d.add(7, 'days')
  t.equal(d.format('nice-day'), 'Mon Nov 11th', 'add days over dst-change')

  // add day over month-change
  let s = spacetime('Oct 31 2020', 'Canada/Eastern')
  s = s.add(2, 'day')
  t.equal(s.format('nice'), 'Nov 2nd, 12:00am', 'add day over month-change')
  // add day over year-change
  s = spacetime('Dec 31 2020', 'Canada/Eastern')
  s = s.add(2, 'day')
  t.equal(s.format('nice'), 'Jan 2nd, 12:00am', 'add day over year-change')

  t.end()
})

test('new-years-eve', (t) => {
  let year = 2022
  let nye = spacetime(`2022-01-01T00:00:00.000Z`)
  for (let i = 0; i < 20; i += 1) {
    nye = nye.minus(1, 'year')
    year -= 1
    t.equal(nye.format(), `${year}-01-01`, `${year} exact millisecond`)
  }
  t.end()
})

test('year-tricky', (t) => {
  let s = spacetime(1451667600000, 'Canada/Eastern') //jan 1 2016 (leap year)
  t.equal(s.year(), 2016, 'year1')

  let a = s.clone().add(1, 'year')
  t.equal(a.year(), 2017, 'year-next')

  let b = s.clone().subtract(1, 'year')
  t.equal(b.year(), 2015, 'year-last')
  t.end()
})
