const test = require('tape')
const spacetime = require('./lib')

test('inputs', (t) => {
  let a = spacetime([2015, 2, 25])
  let b = spacetime('25 Mar 2015')
  let c = spacetime('Mar 25 2015')
  let d = spacetime('03/25/2015')
  let e = spacetime('2015/03/25')
  let f = spacetime('2015-03-25')
  t.ok(a.isValid(), 'date is valid')
  t.ok(a.isSame(b, 'hour'), 'b-is-equal')
  t.ok(a.isSame(c, 'hour'), 'c-is-equal')
  t.ok(a.isSame(d, 'hour'), 'd-is-equal')
  t.ok(a.isSame(e, 'hour'), 'e-is-equal')
  t.ok(a.isSame(f, 'hour'), 'f-is-equal')
  t.end()
})

test('hour-inputs', (t) => {
  let s = spacetime('March 21, 2017 20:42:00')
  t.equal(s.date(), 21, 'before-dst.date()')
  t.ok(s.isValid(), 'hour input is valid')

  s = spacetime('March 11, 2017 20:42:00')
  t.equal(s.date(), 11, 'after-dst.date()')
  t.end()
})

test('null input', (t) => {
  let a = spacetime(null, 'Canada/Eastern')
  let b = spacetime(Date.now(), 'Canada/Eastern')
  t.ok(a.isValid(), 'null input is valid')
  t.equal(a.format('iso-short'), b.format('iso-short'), 'dates are the same')
  t.equal(a.format('time'), b.format('time'), 'times are the same')
  t.end()
})

test('undefined input', (t) => {
  let a = spacetime(undefined, 'Canada/Eastern')
  let b = spacetime(Date.now(), 'Canada/Eastern')
  t.ok(a.isValid(), 'undefined input is valid')
  t.equal(a.format('iso-short'), b.format('iso-short'), 'dates are the same')
  t.equal(a.format('time'), b.format('time'), 'times are the same')
  t.end()
})

test('arr-input', (t) => {
  let s = spacetime([2020, 2, 28])
  t.ok(s.isValid(), 'array input is valid')
  t.equal(s.year(), 2020, 'arr-year')
  t.equal(s.date(), 28, 'arr-date')
  t.equal(s.monthName(), 'march', 'arr-month')

  s = s.set([2017, 1, 2])
  t.equal(s.year(), 2017, 'set-arr-year')
  t.equal(s.date(), 2, 'set-arr-date')
  t.equal(s.month(), 1, 'set-arr-month')

  //on a dst change
  let d = spacetime([2019, 'march', 31, 3, 3], 'Europe/Stockholm')
  t.equal(d.format('{month} {date} {time}'), 'March 31 3:03am', 'array sets time over dst-switch')
  t.end()
})

test('obj-input', (t) => {
  let s = spacetime({
    year: 2020,
    month: 'march',
    date: 28
  })
  t.ok(s.isValid(), 'obj input is valid')
  t.equal(s.date(), 28, 'obj-date')
  t.equal(s.year(), 2020, 'obj-year')
  t.equal(s.monthName(), 'march', 'obj-month')

  //ignore null and undefined values
  let a = spacetime({
    month: '12',
    day: '25',
    hour: '6',
    minute: '24',
    ampm: null
  })
  let b = spacetime({
    month: '12',
    day: '25',
    hour: '6',
    minute: '24'
  })
  t.equal(a.format('nice'), b.format('nice'), 'ampm null')

  s = spacetime({ year: 1921 })
  t.equal(s.format('nice-year'), 'Jan 1st, 1921', 'assume default date')
  s = spacetime({ year: 1921, month: 'feb' })
  t.equal(s.format('nice-year'), 'Feb 1st, 1921', 'assume default date2')
  s = spacetime({ year: 1921, date: 3 })
  t.equal(s.format('nice-year'), 'Jan 3rd, 1921', 'assume default date3')

  t.end()
})

test('date-input', (t) => {
  let d = new Date('March 11, 2017')
  let s = spacetime(d)
  t.ok(s.isValid(), 'date object input is valid')
  // t.equal(s.date(), 11, 'date-date');//FIXME:!
  t.equal(s.year(), 2017, 'date-year')
  t.equal(s.monthName(), 'march', 'date-month')
  t.end()
})

test('self-input', (t) => {
  let a = spacetime('March 11, 2017')
  let s = spacetime(a)
  t.ok(s.isValid(), 'spacetime object input is valid')
  t.equal(s.date(), 11, 'self-date')
  t.equal(s.year(), 2017, 'self-year')
  t.equal(s.monthName(), 'march', 'self-month')
  t.end()
})

test('inputs-in-comparisons', (t) => {
  let s = spacetime('March 11, 2017')
  t.ok(s.isAfter(new Date('March 10, 2017')), 'compare with date obj')
  // t.ok(s.isBefore([2022, 3, 2]), 'compare with array'); //this isn't working yet
  let future = spacetime([2022, 3, 2])
  t.ok(s.isBefore(future.epoch), 'compare with epoch')
  t.ok(s.isBefore(future), 'compare with spacetimeObj')
  t.end()
})

test('iso-string-input', (t) => {
  let s = spacetime('2017-08-06T09:00:00.000Z')
  t.ok(s.isValid(), 'obj input is valid')
  t.equal(s.millisecond(), 0, 'iso-string-millisecond')
  t.equal(s.second(), 0, 'iso-string-second')
  t.equal(s.minute(), 0, 'iso-string-minute')
  t.equal(s.hour(), 9, 'iso-string-hour')
  t.equal(s.date(), 6, 'iso-string-date')
  t.equal(s.month(), 7, 'iso-string-month')
  t.equal(s.year(), 2017, 'iso-string-year')
  t.end()
})

test('overlong-milliseconds-iso-string-input', (t) => {
  let s = spacetime('2017-08-06T09:00:00.12345Z')
  t.ok(s.isValid(), 'overlong obj input is valid')
  t.equal(s.millisecond(), 123, 'overlong-iso-string-millisecond')
  t.equal(s.second(), 0, 'overlong-iso-string-second')
  t.equal(s.minute(), 0, 'overlong-iso-string-minute')
  t.equal(s.hour(), 9, 'overlong-iso-string-hour')
  t.equal(s.date(), 6, 'overlong-iso-string-date')
  t.equal(s.month(), 7, 'overlong-iso-string-month')
  t.equal(s.year(), 2017, 'overlong-iso-string-year')
  t.end()
})

test('iso format with space', (t) => {
  let a = spacetime('2018-02-02T22:00:00')
  let b = spacetime('2018-02-02 22:00:00')
  t.ok(a.isSame(b, 'minute'), 'support space-iso')
  t.end()
})

test('iso format lowercase', (t) => {
  let a = spacetime('2020-03-02t01:03:10.000z')
  let b = spacetime('2020-03-02T01:03:10.000Z')
  t.ok(a.isSame(b, 'minute'), 'lowercase-iso')
  t.end()
})

test('funny-numeric-forms', (t) => {
  let a = spacetime('2016/03/13')

  let b = spacetime('03/13/2016')
  t.equal(a.format('numeric'), b.format('numeric'), 'mm/dd/yyyy')

  b = spacetime('2016/13/03')
  t.equal(a.format('numeric'), b.format('numeric'), 'yyyy/dd/mm')

  b = spacetime('13/03/2016')
  t.equal(a.format('numeric'), b.format('numeric'), 'dd/mm/yyyy')

  b = spacetime('13-mar-2016')
  t.equal(a.format('numeric'), b.format('numeric'), 'dd/month/yyyy')
  t.end()
})

test('empty-array', (t) => {
  let s = spacetime([])
  t.ok(s.isValid(), 'array input is valid')
  t.ok(s.monthName(), 'january', 'empty array is january 1st')
  t.ok(s.date(), 1, 'empty array is january 1st')
  t.ok(s.year(), new Date().getFullYear(), 'empty array is start of current year')
  t.end()
})

test('empty-object', (t) => {
  let s = spacetime({})
  t.ok(s.isValid(), 'obj input is valid')
  t.ok(s.monthName(), 'january', 'empty obj is january 1st')
  t.ok(s.date(), 1, 'empty obj is january 1st')
  t.ok(s.year(), new Date().getFullYear(), 'empty obj is start of current year')
  t.end()
})

test('invalid inputs', (t) => {
  t.equal(spacetime('2012-07-32').isValid(), false, 'day 32')
  t.equal(spacetime('2012-07-22').isValid(), true, 'day 22')

  t.equal(spacetime('2018-02-31').isValid(), false, 'february-days #1')
  t.equal(spacetime('2018-02-30').isValid(), false, 'february-days #2')
  t.equal(spacetime('2018-02-29').isValid(), false, 'non-leap year 2018')
  t.equal(spacetime('2017-02-29').isValid(), false, 'non-leap year 2017')
  t.equal(spacetime('2016-02-29').isValid(), true, 'leap year 2016')
  t.equal(spacetime('2015-02-29').isValid(), false, 'non-leap year 2015')
  t.equal(spacetime('2014-02-29').isValid(), false, 'non-leap year 2014')

  t.equal(spacetime('2018/02/30').isValid(), false, 'february-days format #2')
  t.equal(spacetime('2017-04-32T08:00:00-0700').isValid(), false, 'iso format #1')
  t.equal(spacetime('2017-02-29T08:00:00-0700').isValid(), false, 'iso format #2')
  t.equal(spacetime('2016-02-29T08:00:00-0700').isValid(), true, 'iso format #3')

  t.equal(spacetime('02/28/2015').isValid(), true, 'british format #1')
  t.equal(spacetime('02/29/2015').isValid(), false, 'british format #2')
  t.equal(spacetime('02/29/2016').isValid(), true, 'british format #3')

  t.equal(spacetime('Feb 29 2001').isValid(), false, 'long format #1')
  t.equal(spacetime('Feb 29 2000').isValid(), true, 'long format #2')
  t.equal(spacetime('Feb 29 2003').isValid(), false, 'long format #3')

  t.equal(spacetime('29th Feb 2001').isValid(), false, 'long format #4')
  t.equal(spacetime('29th Feb 2000').isValid(), true, 'long format #5')
  t.equal(spacetime('29th February 2003').isValid(), false, 'long format #6')

  let s = spacetime('-2 February 2003', 'UTC', {
    silent: true
  })
  t.equal(s.isValid(), false, 'negative numbers invalid too')
  t.end()
})

test('time-inputs', (t) => {
  let s = spacetime('July 27 2018')
  t.equal(s.format('nice'), 'Jul 27th, 12:00am', 'no-time')

  //time-easier
  s = spacetime('Tuesday August 1st, 3:30am')
  t.equal(s.format('nice'), 'Aug 1st, 3:30am', '3:30am')

  s = spacetime('Tuesday August 1st, 3:30pm')
  t.equal(s.format('nice'), 'Aug 1st, 3:30pm', '3:30pm')

  s = spacetime('Tuesday August 1st, 2pm')
  t.equal(s.format('nice'), 'Aug 1st, 2:00pm', '2pm')

  s = spacetime('Tuesday August 1st, 9am')
  t.equal(s.format('nice'), 'Aug 1st, 9:00am', '9am')

  //time-weirder
  s = spacetime('Tuesday August 1st, 12:00am')
  t.equal(s.format('nice'), 'Aug 1st, 12:00am', '12:00am')

  s = spacetime('August 1, 2017 00:01:05')
  t.equal(s.format('nice'), 'Aug 1st, 12:01am', '12:01am')

  //invalid minutes
  s = spacetime('June 5 2019, 5:5')
  t.equal(s.format('nice'), 'Jun 5th, 12:00am', 'invalid-minute1')

  s = spacetime('June 5 2019, 5:90')
  t.equal(s.format('nice'), 'Jun 5th, 12:00am', 'invalid-minute2')

  s = spacetime('June 5 2019, 5:82pm')
  t.equal(s.format('nice'), 'Jun 5th, 12:00am', 'invalid-minute2')

  //invalid hours
  s = spacetime('June 5 2019, 13pm')
  t.equal(s.format('nice'), 'Jun 5th, 12:00am', 'invalid-hour1')

  s = spacetime('June 5 2019, 28am')
  t.equal(s.format('nice'), 'Jun 5th, 12:00am', 'invalid-hour2')

  s = spacetime('June 5 2019, 200am')
  t.equal(s.format('nice'), 'Jun 5th, 12:00am', 'invalid-hour3')

  t.end()
})

test('inplicit-years', (t) => {
  let year = new Date().getFullYear()
  t.equal(
    spacetime('sunday April 3rd').format('numeric'),
    spacetime('April 3rd ' + year).format('numeric')
  )
  t.equal(spacetime('3rd June').format('numeric'), spacetime('3rd June ' + year).format('numeric'))
  t.equal(spacetime('03/28').format('numeric'), spacetime('03/28/' + year).format('numeric'))
  t.end()
})

test('inplicit-date', (t) => {
  t.equal(spacetime('dec 1919').format('iso-short'), '1919-12-01')
  t.equal(spacetime('november 2030').format('iso-short'), '2030-11-01')
  t.equal(spacetime('thursday november 2030').format('iso-short'), '2030-11-01')
  t.equal(spacetime('thurs november 2030').format('iso-short'), '2030-11-01')
  t.equal(spacetime('wed november 2030').format('iso-short'), '2030-11-01')
  t.equal(spacetime('sep 2019').format('iso-short'), '2019-09-01')
  t.equal(spacetime('sept 2019').format('iso-short'), '2019-09-01')
  t.end()
})

test('british-input', (t) => {
  let s = spacetime('03/02/2017', null)
  t.equal(s.format('iso-short'), '2017-03-02', 'default mm/dd/yyyy')

  s = spacetime('03/02/2017', null, { dmy: true })
  t.equal(s.format('iso-short'), '2017-02-03', 'force dd/mm/yyyy')
  t.end()
})

test('short-format', (t) => {
  let a = spacetime('22-aug')
  let b = spacetime('aug-22')
  t.equal(a.format('iso-short'), b.format('iso-short'), '22-aug')
  t.end()
})

test('time with seconds', (t) => {
  let s = spacetime('aug 22 2020', 'shanghai')
  s = s.time('1:02:12 PM')
  t.equal(s.iso(), '2020-08-22T13:02:12.000+08:00', '1:02:12 PM')
  s = s.time('10:02:12 AM')
  t.equal(s.iso(), '2020-08-22T10:02:12.000+08:00', '10:02:12 AM')
  t.end()
})

test('period-seperated', (t) => {
  let s = spacetime('2015.08.13')
  t.equal(s.format(), '2015-08-13', 'period-parsed')

  let a = spacetime('09.13.2013')
  let b = spacetime('13.09.2013')
  t.equal(a.format(), b.format(), 'dmy dot format')
  t.end()
})

test('iso-truncated', (t) => {
  let s = spacetime('2012-07')
  t.equal(s.format(), '2012-07-01', 'iso-truncated')
  t.end()
})
