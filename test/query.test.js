'use strict';
const test = require('tape');
const spacetime = require('../src');

test('get', (t) => {
  let s = spacetime('February 22, 2017 15:42:00', 'Canada/Eastern');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.hour(), 15, '.hour()');
  t.equal(s.minute(), 42, '.minute()');
  t.equal(s.month(), 'February', '.month()');
  t.equal(s.day(), 'Wednesday', '.day()');
  t.end();
});

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
  t.equal(s.month(), 'February', '.month()');

  s.month('June');
  t.equal(s.month(), 'June', '.month()');

  s.month('apr');
  t.equal(s.month(), 'April', '.month()');

  t.end();
});

test('set by weekday', (t) => {
  let s = spacetime([2017, 22, 2], 'Canada/Pacific'); //wednesday
  //make sure it's in the right place
  t.equal(s.date(), 22, '.date()');
  t.equal(s.day(), 'Wednesday', '.day()');
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
