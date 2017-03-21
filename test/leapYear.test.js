'use strict';
const test = require('tape');
const spacetime = require('../src');

const fmt = (s) => {
  return s.format().nice.short;
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
