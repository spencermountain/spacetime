'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('isAwake', t => {
  let s = spacetime('March 26, 1999 13:42:00', 'Canada/Eastern');
  t.equal(s.isAwake(), true, 'awake')
  s = spacetime('March 26, 1999 23:42:00', 'Canada/Eastern');
  t.equal(s.isAwake(), false, 'sleeping')
  t.end();
});

test('asleep-test', t => {
  let s = spacetime.now();
  s.dayTime('night');
  t.equal(s.isAsleep(), true, 'sleeping at night');
  s.hour(2);
  t.equal(s.isAsleep(), true, 'sleeping at 2am');
  s.hour12(4);
  t.equal(s.isAsleep(), true, 'sleeping at 4am');
  s.dayTime('lunch');
  t.equal(s.isAsleep(), false, 'awake at lunch');
  s.hour24(14);
  t.equal(s.isAsleep(), false, 'awake at 2pm');
  s.dayTime('evening');
  t.equal(s.isAsleep(), false, 'awake at evening');
  t.end();
});

test('named-dates', t => {
  let christmas = spacetime('christmas', 'Canada/Eastern');
  let newYears = spacetime('new years', 'Canada/Eastern');
  t.equal(christmas.isBefore(newYears), true, 'christmas-is-before-new-years')
  t.end();
});
