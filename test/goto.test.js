'use strict';
const test = require('tape');
const spacetime = require('../src');

test('tz offset moves valid', (t) => {
  let s = spacetime('February 22, 2017 15:42:00', 'Canada/Eastern');
  t.equal(s.date(), 22, 'date');
  t.equal(s.monthName(), 'february', 'month');
  t.equal(s.year(), 2017, 'year');
  t.equal(s.hour(), 15, 'hour');
  t.equal(s.minute(), 42, 'minute');

  //three hours back
  s.goto('Canada/Pacific');
  t.equal(s.date(), 22, 'date');
  t.equal(s.month(), 1, 'month');
  t.equal(s.year(), 2017, 'year');
  t.equal(s.hour(), 12, 'hour-moved');
  t.equal(s.minute(), 42, 'minute');

  //return to est
  s.goto('Canada/Eastern');
  t.equal(s.date(), 22, 'date');
  t.equal(s.month(), 1, 'month');
  t.equal(s.year(), 2017, 'year');
  t.equal(s.hour(), 15, 'hour-returned');
  t.equal(s.minute(), 42, 'minute');

  t.end();
});
