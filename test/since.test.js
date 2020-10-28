const test = require('tape')
const spacetime = require('./lib')

test('since()', (t) => {
  const a = spacetime('November 11, 1999 11:11:11', 'Canada/Eastern')
  const b = spacetime('December 12, 2000 12:12:12', 'Canada/Eastern')

  t.deepEqual(
    b.since(a),
    {
      diff: {
        years: 1,
        months: 1,
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1
      },
      rounded: '1 year ago',
      qualified: '1 year ago',
      precise: '1 year, 1 month ago'
    },
    'simple-ago'
  )

  t.deepEqual(
    a.since(b),
    {
      diff: {
        years: -1,
        months: -1,
        days: -1,
        hours: -1,
        minutes: -1,
        seconds: -1
      },
      rounded: 'in 1 year',
      qualified: 'in 1 year',
      precise: 'in 1 year, 1 month'
    },
    'simple-in'
  )

  t.deepEqual(
    a.since(a),
    {
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
    },
    'same'
  )

  const almostTwoYears = a.clone().add(1, 'year').add(11, 'months')
  const overTwoMonths = a.clone().add(2, 'months').add(11, 'days')
  const yearAndASecond = a.clone().add(1, 'year').add(1, 'second')
  const twoSeconds = a.clone().add(2, 'seconds')

  t.deepEqual(
    a.since(almostTwoYears),
    {
      diff: {
        years: -1,
        months: -11,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      rounded: 'in 2 years',
      qualified: 'in almost 2 years',
      precise: 'in 1 year, 11 months'
    },
    'almost'
  )

  t.deepEqual(
    a.since(overTwoMonths),
    {
      diff: {
        years: 0,
        months: -2,
        days: -11,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      rounded: 'in 2 months',
      qualified: 'in over 2 months',
      precise: 'in 2 months, 11 days'
    },
    'over'
  )

  t.deepEqual(
    a.since(yearAndASecond),
    {
      diff: {
        years: -1,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: -1
      },
      rounded: 'in 1 year',
      qualified: 'in 1 year',
      precise: 'in 1 year, 1 second'
    },
    'precise'
  )

  t.deepEqual(
    a.since(twoSeconds),
    {
      diff: {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: -2
      },
      rounded: 'in 2 seconds',
      qualified: 'in 2 seconds',
      precise: 'in 2 seconds'
    },
    'seconds'
  )

  t.end()
})

test('since now - default', (t) => {
  const past = spacetime.now().subtract(23, 'months').subtract(23, 'seconds')
  const since = past.since()
  t.equal(since.diff.years, -1, '1 year back')
  t.equal(since.diff.months, -11, '11 months back')
  t.equal(since.diff.seconds, -23, '23 seconds back')
  t.equal(since.precise, 'in 1 year, 11 months', 'precise is good')
  t.end()
})

test('supports soft inputs', (t) => {
  let now = spacetime([2019, 3, 12])
  let c = spacetime('dec 25 2018')
  let obj = now.since(c).diff
  t.equal(obj.months, 3, 'christmas was 3 months ago')

  obj = spacetime('christmas').diff('new years')
  t.equal(obj.days, 6, '6 days between christmas and new years')

  obj = spacetime('April 12th 2018').since('April 10th 2018')
  t.equal(obj.rounded, '2 days ago', 'rounded')
  t.equal(obj.qualified, '2 days ago', 'qualified')
  t.equal(obj.precise, '2 days ago', 'precise')
  let diff = obj.diff
  t.equal(diff.years, 0, '0 years')
  t.equal(diff.months, 0, '0 months')
  t.equal(diff.days, 2, '2 days')
  t.equal(diff.hours, 0, '0 hours')
  t.equal(diff.seconds, 0, '0 seconds')

  //opposite since logic
  obj = spacetime('April 8th 2018').since('April 10th 2018')
  t.equal(obj.rounded, 'in 2 days', 'rounded')
  t.equal(obj.qualified, 'in 2 days', 'qualified')
  t.equal(obj.precise, 'in 2 days', 'precise')
  diff = obj.diff
  t.equal(diff.years, 0, '0 years')
  t.equal(diff.months, 0, '0 months')
  t.equal(diff.days, -2, '2 days')
  t.equal(diff.hours, 0, '0 hours')
  t.equal(diff.seconds, 0, '0 seconds')

  t.end()
})

test('from + fromNow aliases', (t) => {
  let obj = spacetime('April 12th 2008', 'Canada/Pacific').from('March 12 2018')
  t.equal(obj.qualified, 'almost 10 years ago', 'qualified')
  t.equal(obj.precise, '9 years, 11 months ago', 'precise')
  t.end()
})

test('since calculation involves month addition and subtraction', (t) => {
  let prev = spacetime('2019-01-31T23:00:50.0Z')
  let now = spacetime('2019-02-01T10:00:00.0Z')
  t.deepEqual(now.since(prev), {
    diff: {
      years: 0,
      months: 0,
      days: 0,
      hours: 10,
      minutes: 59,
      seconds: 10
    },
    rounded: '11 hours ago',
    qualified: 'almost 11 hours ago',
    precise: '10 hours, 59 minutes ago'
  })

  prev = spacetime('2019-08-31T12:00:00.0Z')
  now = spacetime('2019-09-01T11:00:00.0Z')

  t.deepEqual(now.since(prev), {
    diff: {
      years: 0,
      months: 0,
      days: 0,
      hours: 23,
      minutes: 0,
      seconds: 0
    },
    rounded: '23 hours ago',
    qualified: '23 hours ago',
    precise: '23 hours ago'
  })

  t.end()
})
