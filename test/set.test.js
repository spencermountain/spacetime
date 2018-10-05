'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('set', t => {
  let s = spacetime('June 22, 2017 20:12:01', 'Canada/Pacific');

  s.date(5);
  t.equal(s.date(), 5, '.date(5)');

  s.date('24');
  t.equal(s.date(), 24, '.date-string-int');

  s.date(12);
  t.equal(s.date(), 12, '.date()');

  s.year(2015);
  t.equal(s.year(), 2015, '.year()');

  s.hour(5);
  t.equal(s.hour(), 5, '.hour()');

  s.minute(8);
  t.equal(s.minute(), 8, '.minute()');

  s.month('february');
  t.equal(s.month(), 1, '.month()');

  s.month('June');
  t.equal(s.monthName(), 'june', '.month()');

  s.month('apr');
  t.equal(s.monthName(), 'april', '.month()');

  s.week(1);
  t.equal(s.monthName(), 'january', '.week()');

  s.quarter(1);
  t.equal(s.quarter(), 1, '.quarter()');

  s.hourFloat(7.25);
  t.equal(s.hour(), 7, '.hour()');
  t.equal(s.minute(), 15, '.minute()');

  s.dayOfYear(15);
  t.equal(s.monthName(), 'january', 'dayOfYear-.month()');
  t.equal(s.date(), 15, '.dayofYear-date');

  s.month(1);
  t.equal(s.monthName(), 'february', '.monthNum()');

  s.season('summer');
  t.equal(s.monthName(), 'june', 'season-.month()');
  t.equal(s.date(), 1, 'season-.date()');

  s.hour(7);
  s.ampm('am');
  t.equal(s.ampm(), 'am', 'ampm-already-ampm()');
  t.equal(s.hour(), 7, 'ampm-already-hour()');
  s.ampm('pm');
  t.equal(s.hour(), 19, 'ampm-hour()');
  t.equal(s.ampm(), 'pm', 'ampm-ampm()');

  s.time('5:25');
  t.equal(s.hour(), 5, 'time-hour()');
  t.equal(s.minute(), 25, 'time-minute()');
  s.time('5:20pm');
  t.equal(s.hour(), 17, 'time-hour-pm()');
  t.equal(s.minute(), 20, 'time-minute-pm()');
  s.time('13:20pm');
  t.equal(s.hour(), 13, 'time-hour-24h()');
  t.equal(s.minute(), 20, 'time-minute-24h()');
  t.equal(s.era(), 'AD', '2017 ad');
  s.era('bc')
  t.equal(s.era(), 'BC', '2015 bc');
  t.equal(s.year(), -2015, '-2015');
  t.end();
});

test('set by weekday', t => {
  let s = spacetime([2017, 2, 22], 'Canada/Eastern'); //wednesday
  //make sure it's in the right place
  t.equal(s.date(), 22, '.date()');
  t.equal(s.dayName(), 'wednesday', '.day()');
  s.day('thursday');
  t.equal(s.date(), 23, 'now thursday');
  s.day('friday');
  t.equal(s.date(), 24, 'now friday');
  s.day('sat');
  t.equal(s.date(), 25, 'now saturday');
  s.day('sunday');
  //never click-into the next week
  t.equal(s.date(), 19, 'now sunday');
  s.day('monday');
  t.equal(s.date(), 20, 'now monday');
  s.day(2);
  t.equal(s.date(), 21, 'now tuesday');
  t.end();
});

test('set-tricky', t => {
  let s = spacetime('June 22, 2017 13:01:00', 'Canada/Eastern'); //the 22rd
  t.equal(s.date(), 22, '.date()');
  t.equal(s.hour(), 13, '.hour()');
  t.equal(s.ampm(), 'pm', 'night-here');

  s.goto('Australia/Brisbane'); //the 23rd
  t.equal(s.date(), 23, 'tomorrow-there');
  t.equal(s.ampm(), 'am', 'am-there');
  //make it 1oclock
  s.hour(13);
  t.equal(s.hour(), 13, '.hour-remote');
  //make it 1:30pm
  s.minute(30);
  t.equal(s.minute(), 30, '.minute-remote');
  //make it the 5th (not working)
  s.date(5);
  t.equal(s.date(), 5, 'set-date-remotely');
  t.end();
});

test('rollback-in-constructor', t => {
  let s = spacetime('June 22, 2017 5:01:00', 'Australia/Brisbane');
  t.equal(s.hour(), 5, 'hour-australia');
  s = spacetime('June 22, 2017 5:01:00', 'Canada/Pacific');
  t.equal(s.hour(), 5, 'hour-pacific');
  s = spacetime('June 22, 2017 5:01:00', 'Canada/Eastern');
  t.equal(s.hour(), 5, 'hour-eastern');
  t.end();
});

test('set-date-fancy', t => {
  let s = spacetime('June 22, 2017 20:01:00', 'Australia/Brisbane'); //the 22rd
  t.equal(s.date(), 22, '.date-before');
  s.date(15);
  t.equal(s.date(), 15, '.date-after');
  t.end();
});

test('add-a-week-bug', t => {
  let a = spacetime('2018-10-21').goto('America/Adak').add(1, 'week')
  let b = spacetime('2018-10-22').goto('America/Adak').add(1, 'week')
  t.notEqual(a.format('iso'), b.format('iso'), 'two days are not the same')
  t.equal(a.diff(b, 'day'), 1, 'still one day apart')
  t.end();
});
