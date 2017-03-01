'use strict';
const test = require('tape');
const spacetime = require('../src');

test('set', (t) => {
  let s = spacetime('June 22, 2017 20:12:01', 'Canada/Pacific');

  s.date(12);
  t.equal(s.date(), 12, '.date()');

  s.year(2015);
  t.equal(s.year(), 2015, '.year()');

  s.hour(5);
  t.equal(s.hour(), 5, '.hour()');

  s.minute(8);
  t.equal(s.minute(), 8, '.minute()');

  s.month('february');
  t.equal(s.month(), 'february', '.month()');

  s.month('June');
  t.equal(s.month(), 'june', '.month()');

  s.month('apr');
  t.equal(s.month(), 'april', '.month()');

  s.week(1);
  t.equal(s.month(), 'january', '.week()');

  s.quarter(1);
  t.equal(s.month(), 'january', '.quarter()');

  s.hourFloat(7.25);
  t.equal(s.hour(), 7, '.hour()');
  t.equal(s.minute(), 15, '.minute()');

  t.end();
});

test('set by weekday', (t) => {
  let s = spacetime([2017, 2, 22], 'Canada/Eastern'); //wednesday
  //make sure it's in the right place
  t.equal(s.date(), 22, '.date()');
  t.equal(s.day(), 'wednesday', '.day()');
  s.day('thursday');
  t.equal(s.date(), 23, 'now thursday');
  s.day('friday');
  t.equal(s.date(), 24, 'now friday');
  s.day('sat');
  t.equal(s.date(), 25, 'now saturday');
  s.day('sunday');
  t.equal(s.date(), 26, 'now sunday');
  s.day('monday');
  t.equal(s.date(), 27, 'now monday');
  s.day(2);
  t.equal(s.date(), 28, 'now tuesday');
  t.end();
});

// test('set-tricky', (t) => {
//   let s = spacetime('June 22, 2017 13:01:00', 'Canada/Eastern'); //the 22rd
//   t.equal(s.date(), 22, '.date()');
//   t.equal(s.hour(), 13, '.hour()');
//
//   s.goto('Australia/Brisbane'); //the 23rd
//   t.equal(s.date(), 23, 'tomorrow-there');
//   //make it 1oclock
//   s.hour(13);
//   t.equal(s.hour(), 13, '.hour-remote');
//   //make it 1:30pm
//   s.minute(30);
//   t.equal(s.minute(), 30, '.minute-remote');
//   //make it the 5th (not working)
//   s.date(5);
//   t.equal(s.date(), 5, 'set-date-remotely');
//   t.end();
// });

test('rollback-in-constructor', (t) => {
  let s = spacetime('June 22, 2017 5:01:00', 'Australia/Brisbane');
  t.equal(s.hour(), 5, 'hour-australia');
  s = spacetime('June 22, 2017 5:01:00', 'Canada/Pacific');
  t.equal(s.hour(), 5, 'hour-pacific');
  s = spacetime('June 22, 2017 5:01:00', 'Canada/Eastern');
  t.equal(s.hour(), 5, 'hour-eastern');
  t.end();
});

test('set-date-fancy', (t) => {
  let s = spacetime('June 22, 2017 20:01:00', 'Australia/Brisbane'); //the 22rd
  t.equal(s.date(), 22, '.date-before');
  s.date(15);
  t.equal(s.date(), 15, '.date-after');
  t.end();
});
