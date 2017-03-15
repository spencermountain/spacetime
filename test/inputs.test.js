'use strict';
const test = require('tape');
const spacetime = require('../src');

test('inputs', (t) => {
  let a = spacetime([2015, 2, 25]);
  let b = spacetime('25 Mar 2015');
  let c = spacetime('Mar 25 2015');
  let d = spacetime('03/25/2015');
  let e = spacetime('2015/03/25');
  let f = spacetime('2015-03-25');

  t.ok(a.isSame(b, 'day'), 'b-is-equal');
  t.ok(a.isSame(c, 'day'), 'c-is-equal');
  t.ok(a.isSame(d, 'day'), 'd-is-equal');
  t.ok(a.isSame(e, 'day'), 'e-is-equal');
  t.ok(a.isSame(f, 'day'), 'f-is-equal');
  t.end();
});

test('null input', (t) => {

  let a = spacetime(null, 'Canada/Eastern');
  let b = spacetime(Date.now(), 'Canada/Eastern');
  a = a.format();
  b = b.format();
  t.equal(a.iso.short, b.iso.short, 'dates are the same');
  t.equal(a.time.h12, b.time.h12, 'times are the same');

  t.end();
});
