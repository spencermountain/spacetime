'use strict';
const test = require('tape');
const spacetime = require('../src');

test('compare', (t) => {
  let original = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  let d = original.clone();
  t.equal(original.isEqual(d), true, 'originally-equal');
  d.date(29);
  t.equal(original.isEqual(d), false, 'not-equal');
  t.equal(original.isAfter(d), false, 'not-after');
  t.equal(original.isBefore(d), true, 'is-before');

  t.end();
});
