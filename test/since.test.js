'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('since()', t => {
  const a = spacetime('November 11, 1999 11:11:11', 'Canada/Eastern');
  const b = spacetime('December 12, 2000 12:12:12', 'Canada/Eastern');

  t.deepEqual(a.since(b), {
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

  t.deepEqual(b.since(a), {
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

  t.deepEqual(a.since(a), {
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

  t.deepEqual(a.since(almostTwoYears), {
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

  t.deepEqual(a.since(overTwoMonths), {
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

  t.deepEqual(a.since(yearAndASecond), {
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

  t.deepEqual(a.since(twoSeconds), {
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

test('since now', t => {
  const past = spacetime.now()
    .subtract(23, 'months')
    .subtract(23, 'seconds')

  t.deepEqual(past.since(), {
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

test('supports soft inputs', t => {
  let now = spacetime([2019, 3, 12])
  let c = spacetime('christmas')
  c.year(now.year() - 1)
  let obj = now.since(c).diff
  t.equal(obj.months, 3, 'christmas was 3 months ago')

  obj = spacetime('christmas').diff('new years')
  t.equal(obj.days, 6, '6 days between christmas and new years')
  t.end();
});
