'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('implicit goto', t => {
  let a = spacetime('March 14, 2017 22:48:00', 'Africa/Algiers');
  let b = spacetime('March 14, 2017 22:48:00', 'Canada/Pacific');

  t.equal(a.format('iso-short'), b.format('iso-short'), 'dates are the same');
  t.equal(a.format('time-h12'), b.format('time-h12'), 'times are the same');
  t.end();
});

test('goto-from-est', t => {
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

test('goto-from-algiers (no-dst-places)', t => {
  //march 14th in algiers (+60)
  let s = spacetime('March 14, 2017 22:48:00', 'Africa/Algiers');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 10:48pm', 'init-date');
  //this shouldn't change things
  s.goto('Africa/Algiers');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 10:48pm', 'unchanged-date');
  //same offset!
  s.goto('Africa/Brazzaville');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 10:48pm', 'same-offset');
  //one to the left...
  s.goto('Africa/Dakar');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 9:48pm', 'one-hour-left');
  //one to the right...
  s.goto('Africa/Cairo');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 11:48pm', 'one-hour-right');
  //two to the right...
  s.goto('Asia/Baghdad');
  t.equal(s.format('nice-day'), 'Wednesday March 15th, 12:48am', 'two-hours-right-(tomorrow)');
  //three to the right
  s.goto('Asia/Dubai');
  t.equal(s.format('nice-day'), 'Wednesday March 15th, 1:48am', 'three-hours-right-(tomorrow)');
  //three and a half to the right...
  s.goto('Asia/Kabul');
  t.equal(s.format('nice-day'), 'Wednesday March 15th, 2:18am', 'three-and-a-half-to-the-right-(tomorrow)');
  //back to yesterday..
  s.goto('Africa/Dakar');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 9:48pm', 'back-to-one-hour-left');
  //back to original
  s.goto('Africa/Algiers');
  t.equal(s.format('nice-day'), 'Tuesday March 14th, 10:48pm', 'back-to-init-date');

  t.end();
});

test('move-from-dst', t => {
  //dst in Paris (+2h)
  let s = spacetime('March 27, 2017 22:48:00', 'Europe/Paris');
  t.equal(s.format('nice-day'), 'Monday March 27th, 10:48pm', 'init-paris');
  t.equal(s.timezone().current.isDST, true, 'paris-is-in-dst');
  t.equal(s.timezone().current.offset, 2, 'paris-is-+2h');

  //in Johannesburg (+2h)
  s.goto('Africa/Johannesburg');
  t.equal(s.format('nice-day'), 'Monday March 27th, 10:48pm', 'init-joburg');
  t.equal(s.timezone().current.isDST, false, 'joburg-is-never-in-dst');
  t.equal(s.timezone().current.offset, 2, 'joburg-is+2');

  //dst London (+1h)
  s.goto('Europe/London');
  t.equal(s.format('nice-day'), 'Monday March 27th, 9:48pm', 'init-london');
  t.equal(s.timezone().current.isDST, true, 'london-is-in-dst');
  t.equal(s.timezone().current.offset, 1, 'london-is-+1h');
  t.end();
});

test('move-from-not-dst', t => {
  //not-dst in Paris (+1h)
  let s = spacetime('March 17, 2017 22:48:00', 'Europe/Paris');
  t.equal(s.format('nice-day'), 'Friday March 17th, 10:48pm', 'init-paris');
  t.equal(s.timezone().current.isDST, false, 'paris-is-not-in-dst');
  t.equal(s.timezone().current.offset, 1, 'paris-is-+1h');

  //in Johannesburg (+2h)
  s.goto('Africa/Johannesburg');
  t.equal(s.format('nice-day'), 'Friday March 17th, 11:48pm', 'move-to-joburg');
  t.equal(s.timezone().current.isDST, false, 'joburg-is-never-in-dst');
  t.equal(s.timezone().current.offset, 2, 'joburg-is+2');

  //not-dst London (+0h)
  s.goto('Europe/London');
  t.equal(s.format('nice-day'), 'Friday March 17th, 9:48pm', 'init-london');
  t.equal(s.timezone().current.isDST, false, 'london-is-not-in-dst');
  t.equal(s.timezone().current.offset, 0, 'london-is-+0h');
  t.end();
});

test('move-to-dst', t => {
  //move from never-dst (uruguay) to a dst (moncton)
  let s = spacetime('August 1, 2017 00:01:05', 'America/Montevideo');
  t.equal(s.format('nice-day'), 'Tuesday August 1st, 12:01am', 'init-uruguay');
  t.equal(s.timezone().current.isDST, false, 'uruguay-is-never-dst');
  t.equal(s.timezone().current.offset, -3, 'uruguay-is-always -3hrs');
  s.goto('America/Moncton');
  t.equal(s.format('nice-day'), 'Tuesday August 1st, 12:01am', 'init-Moncton');
  t.equal(s.timezone().current.isDST, true, 'Moncton-is-dst');
  t.equal(s.timezone().current.offset, -3, 'Moncton-is -3hrs');
  t.end();
});

test('move-to-not-dst', t => {
  //now move from never-dst (uruguay) to a not-dst (moncton)
  let s = spacetime('January 1, 2017 00:01:05', 'America/Montevideo');
  t.equal(s.format('nice-day'), 'Sunday January 1st, 12:01am', 'init-uruguay');
  t.equal(s.timezone().current.isDST, false, 'uruguay-is-never-dst');
  t.equal(s.timezone().current.offset, -3, 'uruguay-is-always -3hrs');
  s.goto('America/Moncton');
  t.equal(s.format('nice-day'), 'Saturday December 31st, 11:01pm', 'init-Moncton');
  t.equal(s.timezone().current.isDST, false, 'Moncton-is-not-dst');
  t.equal(s.timezone().current.offset, -4, 'Moncton-is -4hrs');
  t.end();
});
