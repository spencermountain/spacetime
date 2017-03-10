'use strict';
const test = require('tape');
const spacetime = require('../src');

test('goto is still equal', (t) => {
  let d = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');

  let monthStart = spacetime('March 1, 1999 00:00:00', 'Canada/Eastern');
  d.startOf('month');
  // console.log(monthStart.month());
  // t.equal(d.isEqual(monthStart), true, 'month-start');
  t.equal(d.isSame(monthStart, 'day'), true, 'same-day');

  t.end();
});
