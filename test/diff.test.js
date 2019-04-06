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
  t.equal(obj.milliseconds, 20000, 'ms')
  t.equal(obj.seconds, 20, 's')
  t.equal(obj.hours, 1, 'hour') // should be 1 since minus 20 sec from midnight
  t.equal(obj.days, 1, 'day')
  t.equal(obj.weeks, 0, 'weeks')
  t.equal(obj.months, 0, 'months')
  t.equal(obj.years, 0, 'years')
  t.end()
})

test('diff-big', t => {
  let a = spacetime('July 27 2018')
  let b = a.clone().minus(20, 'years')
  let obj = b.diff(a)
  t.equal(obj.milliseconds, 631152000000, 'ms')
  t.equal(obj.seconds, 631152000, 's')
  t.equal(obj.hours, 175320, 'hour')
  t.equal(obj.days, 7305, 'day')
  t.equal(obj.weeks, 1044, 'weeks') //some side-effect of making 'add' dst awareness
  t.equal(obj.months, 240, 'months')
  t.equal(obj.years, 20, 'years')
  t.end()
})
