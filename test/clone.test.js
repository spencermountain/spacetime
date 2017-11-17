'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('clone', t => {
  let a = spacetime('March 18, 1999 23:42:00', 'Canada/Eastern');
  let b = a.clone();
  t.equal(a.date(), 18, 'start-date');
  t.equal(a.hour(), 23, 'start hour');
  t.equal(a.isSame(b, 'hour'), true, 'same-hour');

  a.hour(7);
  t.equal(a.hour(), 7, 'new-hour');
  t.equal(b.hour(), 23, 'old-hour');

  b.date(17);
  t.equal(b.date(), 17, 'new-date');
  t.equal(a.date(), 18, 'old-date');

  t.end();
});
