'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('from', t => {
  const a = spacetime('November 11, 1999 11:11:11', 'Canada/Eastern');
  const b = spacetime('December 12, 2000 12:12:12', 'Canada/Eastern');

  t.deepEqual(a.from(b), {
    diff: {
      years: -1,
      months: -1,
      days: -1,
      hours: -1,
      minutes: -1,
      seconds: -1
    },
    rounded: '1 year ago',
    qualified: '1 year ago',
    precise: '1 year, 1 month ago'
  }, 'simple-ago')

  t.deepEqual(b.from(a), {
    diff: {
      years: 1,
      months: 1,
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1
    },
    rounded: 'in 1 year',
    qualified: 'in 1 year',
    precise: 'in 1 year, 1 month'
  }, 'simple-in')

  t.deepEqual(a.from(a), {
    diff: {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    rounded: 'now',
    qualified: 'now',
    precise: 'now'
  }, 'same')

  const almostTwoYears = a.clone().add(1, 'year').add(11, 'months')
  const overTwoMonths = a.clone().add(2, 'months').add(11, 'days')
  const yearAndASecond = a.clone().add(1, 'year').add(1, 'second')
  const twoSeconds = a.clone().add(2, 'seconds')

  t.deepEqual(a.from(almostTwoYears), {
    diff: {
      years: -1,
      months: -11,
      days: -0,
      hours: -0,
      minutes: -0,
      seconds: -0
    },
    rounded: '2 years ago',
    qualified: 'almost 2 years ago',
    precise: '1 year, 11 months ago'
  }, 'almost')

  t.deepEqual(a.from(overTwoMonths), {
    diff: {
      years: -0,
      months: -2,
      days: -11,
      hours: -0,
      minutes: -0,
      seconds: -0
    },
    rounded: '2 months ago',
    qualified: 'over 2 months ago',
    precise: '2 months, 11 days ago'
  }, 'over')

  t.deepEqual(a.from(yearAndASecond), {
    diff: {
      years: -1,
      months: -0,
      days: -0,
      hours: -0,
      minutes: -0,
      seconds: -1
    },
    rounded: '1 year ago',
    qualified: '1 year ago',
    precise: '1 year, 1 second ago'
  }, 'precise')

  t.deepEqual(a.from(twoSeconds), {
    diff: {
      years: -0,
      months: -0,
      days: -0,
      hours: -0,
      minutes: -0,
      seconds: -2
    },
    rounded: '2 seconds ago',
    qualified: '2 seconds ago',
    precise: '2 seconds ago'
  }, 'seconds')

  t.end();
});
