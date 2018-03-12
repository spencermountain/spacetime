'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('fromNow', t => {
  const past = spacetime.now()
    .subtract(23, 'months')
    .subtract(23, 'seconds')

  t.deepEqual(past.fromNow(), {
    diff: {
      years: -1,
      months: -11,
      days: -0,
      hours: -0,
      minutes: -0,
      seconds: -23
    },
    rounded: '2 years ago',
    qualified: 'almost 2 years ago',
    precise: '1 year, 11 months ago'
  }, 'years-ago')

  t.end();
});
