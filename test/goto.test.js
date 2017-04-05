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

test('goto-from-est', (t) => {
  let s = spacetime('February 22, 2017 15:42:00', 'Canada/Eastern');
  t.equal(s.date(), 22, 'est-date');
  t.equal(s.monthName(), 'february', 'est-month');
  t.equal(s.year(), 2017, 'est-year');
  t.equal(s.hour(), 15, 'est-hour');
  t.equal(s.minute(), 42, 'est-minute');

  //three hours back
  s.goto('Canada/Pacific');
  t.equal(s.date(), 22, 'pst-date');
  t.equal(s.month(), 1, 'pst-month');
  t.equal(s.year(), 2017, 'pst-year');
  t.equal(s.hour(), 12, 'pst-hour-moved');
  t.equal(s.minute(), 42, 'pst-minute');

  //return to est
  s.goto('Canada/Eastern');
  t.equal(s.date(), 22, 'est2-date');
  t.equal(s.month(), 1, 'est2-month');
  t.equal(s.year(), 2017, 'est2-year');
  t.equal(s.hour(), 15, 'est2-hour-returned');
  t.equal(s.minute(), 42, 'est2-minute');
  t.end();
});


test('goto-from-algiers (no-dst-places)', (t) => {
  //march 14th in algiers (+60)
  let s = spacetime('March 14, 2017 22:48:00', 'Africa/Algiers');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 10:48pm', 'init-date');
  //this shouldn't change things
  s.goto('Africa/Algiers');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 10:48pm', 'unchanged-date');
  //same offset!
  s.goto('Africa/Brazzaville');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 10:48pm', 'same-offset');
  //one to the left...
  s.goto('Africa/Dakar');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 9:48pm', 'one-hour-left');
  //one to the right...
  s.goto('Africa/Cairo');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 11:48pm', 'one-hour-right');
  //two to the right...
  s.goto('Asia/Baghdad');
  t.equal(s.format().nice.long, 'Wednesday March 15th, 12:48am', 'two-hours-right-(tomorrow)');
  //three to the right
  s.goto('Asia/Dubai');
  t.equal(s.format().nice.long, 'Wednesday March 15th, 1:48am', 'three-hours-right-(tomorrow)');
  //three and a half to the right...
  s.goto('Asia/Kabul');
  t.equal(s.format().nice.long, 'Wednesday March 15th, 2:18am', 'three-and-a-half-to-the-right-(tomorrow)');
  //back to yesterday..
  s.goto('Africa/Dakar');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 9:48pm', 'back-to-one-hour-left');
  //back to original
  s.goto('Africa/Algiers');
  t.equal(s.format().nice.long, 'Tuesday March 14th, 10:48pm', 'back-to-init-date');

  t.end();
});
