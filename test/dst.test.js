'use strict';
const test = require('tape');
const spacetime = require('../src');

test('sneaky-dst', (t) => {
  let s = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  s.hour(0);
  //move date over a dst change
  s.date(2);
  t.equal(s.date(), 2, 'sneaky-apply-dst');
  t.end();
});
