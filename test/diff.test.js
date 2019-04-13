'use strict'
const test = require('tape')
const spacetime = require('./lib')

const numbers = [1, 2, 5, 7, 15, 30, 40, 100, 110]
const units = ['day', 'week', 'month', 'year']

test('simple-diff', t => {
  let a = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern')
  let b = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  t.equal(a.diff(b, 'day'), 2, '2-days')
  a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  b = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern')
  t.equal(a.diff(b, 'day'), -2, '-2-days')
  t.end()
})

test('all-diff', t => {
  let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  units.forEach(unit => {
    numbers.forEach(num => {
      let b = a.clone().add(num, unit)
      t.equal(a.diff(b, unit), num, num + '-' + unit)
    })
  })
  t.end()
})

test('diff-small', t => {
  let a = spacetime('July 27 2018')
  let b = a.clone().minus(20, 'seconds')
  let obj = b.diff(a)
  t.equal(obj.milliseconds, 20000, 'small-ms')
  t.equal(obj.seconds, 20, 'small-s')
  t.equal(obj.hours, 0, 'small-hour')
  t.equal(obj.days, 0, 'small-day')
  t.equal(obj.weeks, 0, 'small-weeks')
  t.equal(obj.months, 0, 'small-months')
  t.equal(obj.years, 0, 'small-years')
  t.end()
})

test('diff-big', t => {
  let a = spacetime('July 27 2018')
  let b = a.clone().minus(20, 'years')
  let obj = b.diff(a)
  t.equal(obj.milliseconds, 631152000000, 'big-ms')
  t.equal(obj.seconds, 631152000, 'big-s')
  t.equal(obj.hours, 175320, 'big-hour')
  t.equal(obj.days, 7305, 'big-day')
  // t.equal(obj.weeks, 1044, 'big-weeks') //some side-effect of making 'add' dst awareness
  t.equal(obj.months, 240, 'big-months')
  t.equal(obj.years, 20, 'big-years')
  t.end()
})

test('diff-awkward', t => {
  let start = spacetime('Dec 25th 2019')
  let end = spacetime('Jan 5th 2020')
  t.equal(start.diff(end, 'year'), 0, 'a few days is not a year')

  start = spacetime('April 11th 2019') //thursday
  end = spacetime('April 11th 2019') //tuesday
  t.equal(start.diff(end, 'week'), 0, 'a few days is not a week')

  start = spacetime('Dec 25th 2019')
  end = spacetime('Jan 5th 2020')
  t.equal(start.diff(end, 'month'), 0, 'a few days is not a month')

  start = spacetime('Dec 25th 2019 5pm')
  end = spacetime('Dec 26th 2019 9am')
  t.equal(start.diff(end, 'day'), 0, 'a few hours is not a day')

  t.end()
})
