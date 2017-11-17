'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('isSame', t => {
  let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  let b = a.clone();
  t.equal(a.isSame(b, 'hour'), true, 'same-hour');
  t.equal(a.isSame(b, 'day'), true, 'same-day');
  t.equal(a.isSame(b, 'week'), true, 'same-week');
  t.equal(a.isSame(b, 'month'), true, 'same-month');
  t.equal(a.isSame(b, 'quarter'), true, 'same-quarter');
  t.equal(a.isSame(b, 'year'), true, 'same-year');

  b.add(2, 'hours');
  t.equal(a.isSame(b, 'hour'), false, 'same-hour');
  t.equal(a.isSame(b, 'day'), true, 'same-day');
  t.equal(a.isSame(b, 'month'), true, 'same-month');
  t.equal(a.isSame(b, 'year'), true, 'same-year');

  b.subtract(2, 'days');
  t.equal(a.isSame(b, 'hour'), false, 'same-hour');
  t.equal(a.isSame(b, 'day'), false, 'same-day');
  t.equal(a.isSame(b, 'month'), true, 'same-month');
  t.equal(a.isSame(b, 'year'), true, 'same-year');

  b.subtract(30, 'days');
  t.equal(a.isSame(b, 'hour'), false, 'same-hour');
  t.equal(a.isSame(b, 'day'), false, 'same-day');
  t.equal(a.isSame(b, 'month'), false, 'same-month');
  t.equal(a.isSame(b, 'year'), true, 'same-year');

  b.year(2020);
  t.equal(a.isSame(b, 'hour'), false, 'same-hour');
  t.equal(a.isSame(b, 'day'), false, 'same-day');
  t.equal(a.isSame(b, 'month'), false, 'same-month');
  t.equal(a.isSame(b, 'year'), false, 'same-year');

  t.end();
});
