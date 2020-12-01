const test = require('tape')
const spacetime = require('./lib')

test('set', (t) => {
  let s = spacetime('June 22, 2017 20:12:01', 'Canada/Pacific')

  s = s.date(5)
  t.equal(s.date(), 5, '.date(5)')

  s = s.date('24')
  t.equal(s.date(), 24, '.date-string-int')

  s = s.date(12)
  t.equal(s.date(), 12, '.date()')

  s = s.year(2015)
  t.equal(s.year(), 2015, '.year()')

  s = s.hour(5)
  t.equal(s.hour(), 5, '.hour()')

  s = s.minute(8)
  t.equal(s.minute(), 8, '.minute()')

  s = s.month('february')
  t.equal(s.month(), 1, '.month()')

  s = s.month('June')
  t.equal(s.monthName(), 'june', '.month()')

  s = s.month('apr')
  t.equal(s.monthName(), 'april', '.month()')

  s = s.week(1)
  t.equal(s.monthName(), 'january', '.week()')

  s = s.quarter(1)
  t.equal(s.quarter(), 1, '.quarter()')

  s = s.hourFloat(7.25)
  t.equal(s.hour(), 7, '.hour()')
  t.equal(s.minute(), 15, '.minute()')

  s = s.dayOfYear(15)
  t.equal(s.monthName(), 'january', 'dayOfYear-.month()')
  t.equal(s.date(), 15, '.dayofYear-date')

  s = s.month(1)
  t.equal(s.monthName(), 'february', '.monthNum()')

  s = s.season('summer')
  t.equal(s.monthName(), 'june', 'season-.month()')
  t.equal(s.date(), 1, 'season-.date()')

  s = s.hour(7)
  s = s.ampm('am')
  t.equal(s.ampm(), 'am', 'ampm-already-ampm()')
  t.equal(s.hour(), 7, 'ampm-already-hour()')

  s = s.ampm('pm')
  t.equal(s.hour(), 19, 'ampm-hour()')
  t.equal(s.ampm(), 'pm', 'ampm-ampm()')

  s = s.time('5:25')
  t.equal(s.hour(), 5, 'time-hour()')
  t.equal(s.minute(), 25, 'time-minute()')

  s = s.time('5:20pm')
  t.equal(s.hour(), 17, 'time-hour-pm()')
  t.equal(s.minute(), 20, 'time-minute-pm()')

  s = s.time('5:20 pm')
  t.equal(s.hour(), 17, 'time-hour-pm-with-space()')
  t.equal(s.minute(), 20, 'time-minute-pm-with-space()')

  s = s.time('5pm')
  t.equal(s.hour(), 17, 'time-hour-pm-hour-only()')
  t.equal(s.minute(), 0, 'time-minute-pm-hour-only()')

  s = s.time('6 pm')
  t.equal(s.hour(), 18, 'time-hour-pm-hour-only-with-space()')
  t.equal(s.minute(), 0, 'time-minute-pm-hour-only-with-space()')

  s = s.time('13:20pm')
  t.equal(s.hour(), 13, 'time-hour-24h()')
  t.equal(s.minute(), 20, 'time-minute-24h()')
  t.equal(s.era(), 'AD', '2017 ad')

  s = s.era('bc')
  t.equal(s.era(), 'BC', '2015 bc')
  t.equal(s.year(), -2015, '-2015')
  t.end()
})

test('set by weekday', (t) => {
  let s = spacetime([2017, 2, 22], 'Canada/Eastern') //wednesday
  //make sure it's in the right place
  t.equal(s.date(), 22, '.date()')
  t.equal(s.dayName(), 'wednesday', '.day()')

  s = s.day('thursday')
  t.equal(s.date(), 23, 'now thursday')

  s = s.day('friday')
  t.equal(s.date(), 24, 'now friday')

  s = s.day('sat')
  t.equal(s.date(), 25, 'now saturday')

  s = s.day('sunday')
  //never click-into the next week
  t.equal(s.date(), 19, 'now sunday')

  s = s.day('monday')
  t.equal(s.date(), 20, 'now monday')

  s = s.day(2)
  t.equal(s.date(), 21, 'now tuesday')
  t.end()
})

test('set-tricky', (t) => {
  let s = spacetime('June 22, 2017 13:01:00', 'Canada/Eastern') //the 22rd
  t.equal(s.date(), 22, '.date()')
  t.equal(s.hour(), 13, '.hour()')
  t.equal(s.ampm(), 'pm', 'night-here')

  s = s.goto('Australia/Brisbane') //the 23rd
  t.equal(s.date(), 23, 'tomorrow-there')
  t.equal(s.ampm(), 'am', 'am-there')
  //make it 1oclock
  s = s.hour(13)
  t.equal(s.hour(), 13, '.hour-remote')
  //make it 1:30pm
  s = s.minute(30)
  t.equal(s.minute(), 30, '.minute-remote')
  //make it the 5th (not working)
  s = s.date(5)
  t.equal(s.date(), 5, 'set-date-remotely')
  t.end()
})

test('rollback-in-constructor', (t) => {
  let s = spacetime('June 22, 2017 5:01:00', 'Australia/Brisbane')
  t.equal(s.hour(), 5, 'hour-australia')
  s = spacetime('June 22, 2017 5:01:00', 'Canada/Pacific')
  t.equal(s.hour(), 5, 'hour-pacific')
  s = spacetime('June 22, 2017 5:01:00', 'Canada/Eastern')
  t.equal(s.hour(), 5, 'hour-eastern')
  t.end()
})

test('set-date-fancy', (t) => {
  let s = spacetime('June 22, 2017 20:01:00', 'Australia/Brisbane') //the 22rd
  t.equal(s.date(), 22, '.date-before')
  s = s.date(15)
  t.equal(s.date(), 15, '.date-after')
  t.end()
})

test('military time format', (t) => {
  let s = spacetime('2018-10-21')
  s = s.time('13h00')
  t.equal(s.time(), '1:00pm', '13h00')
  s = s.time('2h30')
  t.equal(s.time(), '2:30am', '2h30')
  t.end()
})
test('add-a-week-bug', (t) => {
  let a = spacetime('2018-10-21').goto('America/Adak').add(1, 'week')
  let b = spacetime('2018-10-22').goto('America/Adak').add(1, 'week')
  t.notEqual(a.format('iso'), b.format('iso'), 'two days are not the same')
  t.equal(a.diff(b, 'day'), 1, 'still one day apart')
  t.end()
})
