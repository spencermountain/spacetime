'use strict';
const test = require('tape');
const spacetime = require('../src');

const fmt = (s) => {
  return s.format('nice-short');
};

test('leapyear-basic', (t) => {
  let d = spacetime('December 12, 2016 20:42:00', 'Africa/Algiers');
  t.equal(d.leapYear(), true, '2016-leap');

  d = spacetime('April 12, 2020 10:42:00', 'Canada/Pacific');
  t.equal(d.leapYear(), true, '2020-leap');

  d = spacetime('April 12, 2024 10:42:00', 'Canada/Eastern');
  t.equal(d.leapYear(), true, '2024-leap');

  d = spacetime('April 12, 2018 10:42:00', 'Canada/Eastern');
  t.equal(d.leapYear(), false, '2018-not-leap');

  d = spacetime('April 12, 2019 10:42:00', 'Canada/Pacific');
  t.equal(d.leapYear(), false, '2019-not-leap');

  d = spacetime('April 12, 2023 10:42:00', 'Africa/Algiers');
  t.equal(d.leapYear(), false, '2023-not-leap');

  t.end();
});

test('leapyear-in-add', (t) => {
  let d = spacetime('December 1, 2000 20:42:00', 'Africa/Algiers');
  let first = d.clone();

  d.add(365, 'day');
  t.equal(d.leapYear(), false, 'not-leap-1');
  t.equal(fmt(first), fmt(d), 'same-day-1');

  d.add(365, 'day');
  t.equal(d.leapYear(), false, 'not-leap-2');
  t.equal(fmt(first), fmt(d), 'same-day-2');

  d.add(365, 'day');
  t.equal(d.leapYear(), false, 'not-leap-3');
  t.equal(fmt(first), fmt(d), 'same-day-3');

  d.add(365, 'day');
  t.equal(d.leapYear(), true, 'leap-4');
  t.notEqual(fmt(first), fmt(d), 'same-day-4');

  t.end();
});

test('feb-29th-exists', (t) => {
  let leaps = [
    2004,
    2008,
    2012,
    2016,
    2020,
    2024,
  ];
  leaps.forEach((y) => {
    //feb 28th 11:30pm
    let s = spacetime([y, 1, 28, 23, 30], 'Africa/Algiers');
    s.add(1, 'hour');
    t.equal(s.format('nice-short'), 'Feb 29th, 12:30am', 'forward into leapday on ' + y);
    //march 1st 5:30pm
    s = spacetime([y, 2, 1, 17, 30], 'Canada/Mountain');
    s.subtract(1, 'day');
    t.equal(s.format('nice-short'), 'Feb 29th, 5:30pm', 'backward into leapday on ' + y);
  });
  t.end();
});

test('feb-29th-doesnt-exist', (t) => {
  let noLeaps = [
    2005,
    2009,
    2010,
    2011,
    2013,
    2017,
    2019,
    2021,
  ];
  noLeaps.forEach((y) => {
    //feb 28th 11:30pm
    let s = spacetime([y, 1, 28, 23, 30], 'Africa/Algiers');
    s.add(1, 'hour');
    t.equal(s.format('nice-short'), 'Mar 1st, 12:30am', 'no leap on ' + y);
    //march 1st 5:30pm
    s = spacetime([y, 2, 1, 17, 30], 'Canada/Eastern');
    s.subtract(1, 'day');
    t.equal(s.format('nice-short'), 'Feb 28th, 5:30pm', 'backward with no leapday on ' + y);
  });
  t.end();
});
