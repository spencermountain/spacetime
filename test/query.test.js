'use strict';
const test = require('tape');
const spacetime = require('../src');

test('get', (t) => {
  let s = spacetime('February 22, 2017 15:42:00', 'Canada/Eastern');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.quarter(), 1, '.quarter()');
  t.equal(s.hour(), 15, '.hour()');
  t.equal(s.minute(), 42, '.minute()');
  t.equal(s.month(), 'february', '.month()');
  t.equal(s.day(), 'wednesday', '.day()');
  t.end();
});

test('get-quarters', (t) => {
  let s = spacetime('January 22, 2017 15:42:00', 'Canada/Eastern');
  t.equal(s.quarter(), 1, '.quarter()');

  s.month(1);
  t.equal(s.quarter(), 1, '.quarter()');

  s.month('march');
  t.equal(s.quarter(), 1, '.quarter()');

  s.month(3);
  t.equal(s.quarter(), 2, '.quarter()');

  s.month('december');
  t.equal(s.quarter(), 4, '.quarter()');
  t.end();
});

test('get-weeks', (t) => {
  let s = spacetime('January 1, 2015 2:00:00', 'Canada/Eastern');
  t.equal(s.week(), 1, '.weeks()');

  s.month(1);
  t.equal(s.week(), 4, '.weeks()');

  s.month('december');
  s.date(29);
  t.equal(s.week(), 52, '.weeks()');
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
  t.equal(s.month(), 'february', '.month()');

  s.month('June');
  t.equal(s.month(), 'june', '.month()');

  s.month('apr');
  t.equal(s.month(), 'april', '.month()');

  s.week(1);
  t.equal(s.month(), 'january', '.week()');

  s.quarter(1);
  t.equal(s.month(), 'january', '.quarter()');

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
