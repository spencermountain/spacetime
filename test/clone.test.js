'use strict';
const test = require('tape');
const spacetime = require('../src');

test('clone', (t) => {
  let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  let b = a.clone();
  t.equal(a.hour(), 20, 'start hour');
  t.equal(a.isSame(b, 'hour'), true, 'same-hour');

  a.hour(7);
  t.equal(a.hour(), 7, 'new-hour');
  t.equal(b.hour(), 20, 'old-hour');

  b.date(17);
  t.equal(a.date(), 28, 'new-date');
  t.equal(b.date(), 17, 'old-date');

  t.end();
});
