let test = require('tape')
let spacetime = require('./lib')

test('to-from utc-format', (t) => {
  ;[
    '1998-05-01T08:00:00.000Z',
    '1998-05-30T22:00:00.000Z',
    '2017-01-01T08:00:00.000Z',
    '2017-01-30T22:00:00.000Z',
    '2016-02-02T08:00:00.000Z',
    '2016-02-02T09:00:00.100Z',
    '2016-11-02T08:01:22.023Z',
    '2016-11-04T09:00:59.122Z',
    '2015-01-02T20:01:22.023Z',
    '2016-03-28T09:01:00.999Z',
    '2019-04-01T12:15:00.000+03:00',
    '2019-04-01T12:15:00.000+04:00',
    '2019-04-01T12:15:00.000+05:00',
    '2019-04-01T12:15:00.000+05:30',
    '2019-03-13T18:00:00.000-05:30',
    '2019-03-13T18:00:00.000-00:30',
    '2011-01-01T18:00:00.000+00:30',
    '1992-03-21T18:00:00.000+11:30',
    '1990-03-22T06:20:30.020+11:30',
    '1990-03-22T06:20:30.020+11:00',
    '1962-03-22T11:11:30.120-11:00',
    '0986-05-01T09:58:23.078-04:00',
    '0098-05-04T23:16:19.444Z',
    '-000098-05-04T23:16:19.444Z',
    '-000986-05-01T09:58:23.078-04:00',
    '-002345-05-04T23:12:01.970Z'
  ].forEach((str) => {
    let s = spacetime(str)
    let out = s.format('iso')
    t.equal(str, out, 'equal - ' + str)
  })

  let str = '2016-01-01T09:00:00.122Z'
  let s = spacetime(str, 'Canada/Eastern')
  t.equal(s.format('iso'), str, 'input matches output')

  t.end()
})

test('unix-formatting', (t) => {
  let epoch = 1510850065194
  let s = spacetime(epoch, 'Canada/Eastern')
  //examples from http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
  let arr = [
    ['h:mm a', '11:34 AM'],
    ['LLL', 'Nov'],
    [`yyyy.MM.dd G 'at' HH:mm:ss zzz`, '2017.11.16 AD at 11:34:25 Canada/Eastern'],
    [`EEE, MMM d, ''yy`, "Thu, Nov 16, '17"],
    [`hh 'o''clock' a`, '11 oclock AM'],
    ['yyyyy.MMMM.dd GGG hh:mm aaa', '02017.November.16 AD 11:34 AM'],
    ['yyyy-MM-ddTHH:mm:ssZ', '2017-11-16T11:34:25-0500'],
    ['yyyy-MM-ddTHH:mm:ssZZ', '2017-11-16T11:34:25-0500'],
    ['yyyy-MM-ddTHH:mm:ssZZZ', '2017-11-16T11:34:25-0500'],
    ['yyyy-MM-ddTHH:mm:ssZZZZ', '2017-11-16T11:34:25-05:00'],
    // support spaces
    ["HH'h'", '11h'],
    ["HH 'h'", '11 h']
  ]
  arr.forEach((a) => {
    t.equal(s.unixFmt(a[0]), a[1], a[0])
  })

  //test another date
  s = spacetime([2018, 'February', 20], 'Canada/Eastern')
  arr = [
    ['M', '2'],
    ['MM', '02'],
    ['MMM', 'Feb'],
    ['MMMM', 'February']
  ]
  arr.forEach((a) => {
    t.equal(s.unixFmt(a[0]), a[1], a[0])
  })
  t.end()
})

test('bc-year-formatting', (t) => {
  let s = spacetime('2,000 BC')
  t.equal(s.format('year'), '2000 BC', '2000bc')
  t.equal(s.year(), -2000, '-2000')

  s = spacetime('July 27th, 2018')
  s = s.minus(2020, 'years')
  t.equal(s.year(), -1, '-1')
  t.equal(s.format('year'), '1 BC', '1bc')
  t.equal(s.monthName(), 'july', 'still july')
  t.equal(s.date(), 27, 'still july 27')

  t.end()
})

test('iso-in = iso-out', (t) => {
  let str = '2018-07-09T12:59:00.362-07:00'
  let minus = spacetime(str)
  t.equal(minus.format('iso'), str, 'minus-seven')

  str = '2018-07-09T12:59:00.000+07:00'
  let plus = spacetime(str)
  t.equal(plus.format('iso'), str, 'plus-seven')

  str = '2018-07-09T12:59:00.393Z'
  let zero = spacetime(str)
  t.equal(zero.format('iso'), str, 'zulu')

  t.end()
})

test('iso-with-fraction-offset', (t) => {
  let s = spacetime('June 8th 1918', 'Asia/Calcutta').time('1:00pm')
  t.equal(s.format('iso'), '1918-06-08T13:00:00.000+05:30', 'correct offset')
  t.end()
})

test('hour-pad', (t) => {
  let s = spacetime('June 8th 1918', 'Asia/Calcutta').time('1:23pm')
  t.equal(s.format('{hour-pad}:{minute-pad}'), '01:23', 'hour-pad')
  t.equal(s.format('{hour-24-pad}:{minute-pad}'), '13:23', '24-hour-pad')
  s = s.ampm('am')
  t.equal(s.format('{hour-pad}:{minute-pad}'), '01:23', 'am-hour-pad')
  t.equal(s.format('{hour-24-pad}:{minute-pad}'), '01:23', 'am-24-hour-pad')
  t.end()
})

test('made-up-syntax', (t) => {
  let s = spacetime('June 8th 1918', 'Asia/Calcutta')
  s = s.time('4:45pm')
  let arr = [
    ['month', 'June'],
    ['{month}', 'June'],
    ['{month} {hour}:{minute}{ampm}', 'June 4:45pm'],
    ['{day} the {date-ordinal} of {month}', 'Saturday the 8th of June']
  ]
  arr.forEach((a) => {
    t.equal(s.format(a[0]), a[1], a[0])
  })
  t.end()
})

test('test 0-based formatting', (t) => {
  let s = spacetime('January 4 2017').time('12:01am')
  let out = s.format('{month} {month-number} {month-pad} {month-iso} {hour-24}')
  t.equal(out, 'January 0 00 01 0', '0-based and 1-based months')
  t.end()
})

test('offset formatting', (t) => {
  const date = spacetime(null, 'Asia/Kathmandu')
  t.equal(date.format('offset'), '+05:45', '45min offset')
  t.end()
})

/* FIXME failing test
test('unix-fmt-padding', t => {
  let d = spacetime({
    year: 2017,
    month: 'january',
    day: 26,
    hour: 4,
    minute: 2
  })
  let str = d.format("ww DDD MM d, hh:mm a")
  t.equal('04 027 Jan 27, 04:02 AM', str, 'string is 0-padded')

  str = d.format("w D MM d, h:m a")
  t.equal('4 27 Jan 27, 4:2 AM', str, 'string is not-0-padded')
  t.end();
});*/
