'use strict';
const test = require('tape');
const spacetime = require('../src');

test('get', (t) => {
  let s = spacetime('February 22, 2017 15:42:00', 'Canada/Eastern');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.hour(), 15, '.hour()');
  t.equal(s.minute(), 42, '.minute()');
  t.equal(s.month(), 'February', '.month()');
  t.end();
});
