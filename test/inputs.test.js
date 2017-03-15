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

  t.ok(a.isSame(b, 'hour'), 'b-is-equal');
  t.ok(a.isSame(c, 'hour'), 'c-is-equal');
  t.ok(a.isSame(d, 'hour'), 'd-is-equal');
  t.ok(a.isSame(e, 'hour'), 'e-is-equal');
  t.ok(a.isSame(f, 'hour'), 'f-is-equal');
  t.end();
});

test('hour-inputs', (t) => {
  let s = spacetime('March 21, 2017 20:42:00');
  t.equal(s.date(), 21, 'before-dst.date()');

  s = spacetime('March 11, 2017 20:42:00');
  t.equal(s.date(), 11, 'after-dst.date()');
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
