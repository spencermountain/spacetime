'use strict';
const test = require('tape');
const spacetime = require('../src');

test('start of month', (t) => {
  let d = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  d.startOf('month');

  let monthStart = spacetime('March 1, 1999 00:00:00', 'Canada/Eastern');
  monthStart.millisecond(1);

  t.equal(d.isEqual(monthStart), true, 'month-start');
  t.equal(d.isSame(monthStart, 'day'), true, 'same-day');
  t.equal(d.isSame(monthStart, 'month'), true, 'same-month');
  t.equal(d.isSame(monthStart, 'year'), true, 'same-year');
  t.equal(d.date(), 1, 'first day');
  t.equal(d.hour(), 0, 'first hour');

  t.end();
});

test('start of winter', (t) => {
  let d = spacetime('January 28, 2017 20:42:00', 'Canada/Pacific');
  d.startOf('season');

  let start = spacetime('December 1, 2017 00:00:00', 'Canada/Pacific');
  start.millisecond(1);

  t.equal(d.isEqual(start), true, 'month-start');
  t.equal(d.isSame(start, 'day'), true, 'same-day');
  t.equal(d.isSame(start, 'month'), true, 'same-month');
  t.equal(d.isSame(start, 'year'), true, 'same-year');
  t.equal(d.date(), 1, 'first day');
  t.equal(d.hour(), 0, 'first hour');

  t.end();
});
