'use strict';
const test = require('tape');
const spacetime = require('../src');

const numbers = [
  1,
  2,
  5,
  7,
  15,
  30,
  40,
  100,
  110,
];
const units = [
  'day',
  'week',
  'month',
  'year',
];


test('simple-diff', (t) => {
  let a = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern');
  let b = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  t.equal(a.diff(b, 'day'), 2, '2-days');
  a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  b = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern');
  t.equal(a.diff(b, 'day'), -2, '-2-days');
  t.end();
});

test('all-diff', (t) => {
  let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  units.forEach((unit) => {
    numbers.forEach((num) => {
      let b = a.clone().add(num, unit);
      t.equal(a.diff(b, unit), num, num + '-' + unit);
    });
  });
  t.end();
});
