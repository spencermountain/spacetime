'use strict';
const test = require('tape');
const spacetime = require('../src');

test('input tests', (t) => {
  let iso = spacetime('March 14, 2017 20:42:00', 'Canada/Eastern');
  let epoch = spacetime(1489520285, 'Canada/Eastern');
  let arr = spacetime([2017, 2, 14], 'Canada/Eastern');
  let d = original.goto('Canada/Pacific');
  t.equal(original.isEqual(d), true, 'originally-equal');
  t.equal(original.isAfter(d), false, 'originally-not-after');
  t.equal(original.isBefore(d), false, 'originally-is-before');
  t.end();
});
