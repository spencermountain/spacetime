'use strict';
const test = require('tape');
const spacetime = require('../src');

test('implicit goto', (t) => {
  let a = spacetime('March 14, 2017 22:48:00', 'Africa/Algiers');
  let b = spacetime('March 14, 2017 22:48:00', 'Canada/Pacific');
  a = a.format();
  b = b.format();
  t.equal(a.iso.short, b.iso.short, 'dates are the same');
  t.equal(a.time.h12, b.time.h12, 'times are the same');
  t.end();
});

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

  //do a new date
  s = spacetime('March 14, 2017 22:48:00');
  s.goto('Africa/Algiers');
  t.equal(s.format().iso.short, '2017-02-15');
  t.equal(s.format().time.h12, '3:48am');

  //same thing for pacific time
  s = spacetime('March 14, 2017 22:48:00');
  s.goto('Canada/Pacific');
  t.equal(s.format().iso.short, '2017-02-14');
  t.equal(s.format().time.h12, '7:48pm');


  t.end();
});
