'use strict';
const test = require('tape');
const spacetime = require('../src');

test('whereits', t => {
  let tzs = spacetime.whereIts('9am');
  t.ok(tzs.length > 0, '9am somewhere');
  t.ok(tzs.length < 90, '9am-is-subset');
  tzs = spacetime.whereIts('10am');
  t.ok(tzs.length > 0, '10am somewhere');
  t.ok(tzs.length < 90, '10am-is-subset');
  tzs = spacetime.whereIts('8pm');
  t.ok(tzs.length > 0, '8pm somewhere');
  t.ok(tzs.length < 90, '8pm-is-subset');
  tzs = spacetime.whereIts('11pm');
  t.ok(tzs.length > 0, '11pm somewhere');
  t.ok(tzs.length < 90, '11pm-is-subset');

  tzs = spacetime.whereIts('9:00am', '11:00am');
  t.ok(tzs.length > 0, '9am-11am somewhere');
  t.ok(tzs.length < 120, '9am-11am-is-subset');

  tzs = spacetime.whereIts('9am', '11pm');
  t.ok(tzs.length > 0, '9am-11pm somewhere');
  t.ok(tzs.length < 503, '9am-11pm-is-subset');

  tzs = spacetime.whereIts('8pm', '11pm');
  t.ok(tzs.length > 0, '8pm-11pm somewhere');
  t.ok(tzs.length < 503, '8pm-11pm-is-subset');

  tzs = spacetime.whereIts('8pm', '7pm');
  t.ok(tzs.length === 0, '8pm-7pm nowhere');

  tzs = spacetime.whereIts('8pm', '7am');
  t.ok(tzs.length === 0, '8pm-apm nowhere');

  t.end();
});
