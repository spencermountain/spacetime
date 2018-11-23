'use strict';
var test = require('tape');
var spacetime = require('./lib');

test('to-from utc-format', t => {
  [
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
  ].forEach(str => {
    var s = spacetime(str, 'Asia/Taipei');
    var out = s.format('iso');
    t.equal(str, out, 'equal - ' + str);
  });

  var str = '2016-01-01T09:00:00.122Z';
  var s = spacetime(str, 'Canada/Eastern');
  t.equal(s.format('iso'), str, 'input matches output');

  t.end();
});


test('unix-formatting', t => {
  let epoch = 1510850065194
  let s = spacetime(epoch, 'Canada/Eastern')
  //examples from http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
  let arr = [
    ['h:mm a', '11:34 AM'],
    ['LLL', 'Nov'],
    [`yyyy.MM.dd G 'at' HH:mm:ss zzz`, '2017.11.16 AD at 11:34:25 Canada/Eastern'],
    [`EEE, MMM d, ''yy`, 'Thu, Nov 16, \'17'],
    [`hh 'o''clock' a`, '11 oclock AM'],
    ['yyyyy.MMMM.dd GGG hh:mm aaa', '02017.November.16 AD 11:34 AM'],
  ]
  arr.forEach((a) => {
    t.equal(s.format(a[0]), a[1], a[0])
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
    t.equal(s.format(a[0]), a[1], a[0])
  })
  t.end();
});

test('bc-year-formatting', t => {
  let s = spacetime('2,000 BC')
  t.equal(s.format('year'), '2000 BC', '2000bc')
  t.equal(s.year(), -2000, '-2000')

  s = spacetime('July 27th, 2018')
  s.minus(2020, 'years')
  t.equal(s.year(), -1, '-1')
  t.equal(s.format('year'), '1 BC', '1bc')
  t.equal(s.monthName(), 'july', 'still july')
  t.equal(s.date(), 27, 'still july 27')

  t.end();
});

test('iso-in = iso-out', t => {
  let str = '2018-07-09T12:59:00.362-07:00'
  var minus = spacetime(str);
  t.equal(minus.format('iso'), str, 'minus-seven');

  str = '2018-07-09T12:59:00.000+07:00'
  var plus = spacetime(str);
  t.equal(plus.format('iso'), str, 'plus-seven');

  str = '2018-07-09T12:59:00.393Z'
  var zero = spacetime(str);
  t.equal(zero.format('iso'), str, 'zulu');

  t.end();
});

test('iso-with-fraction-offset', t => {
  let s=spacetime('June 8th 1918','Asia/Calcutta').time('1:00pm')
  t.equal(s.format('iso'),'1918-06-08T13:00:00.000+05:30','correct offset')
  t.end();
});
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
