'use strict'
const test = require('tape')
const spacetime = require('./lib')

test('change start of week', t => {
  let s = spacetime('may 30 2019', 'Canada/Eastern')
  s = s.startOf('week')
  t.equal(s.dayName(), 'monday', 'monday is default')
  t.equal(s.day(), 1, 'monday is 1')
  t.equal(s.date(), 27, 'startof week went backwards')

  //ok, change it
  s = s.weekStart(0)
  s = s.startOf('week')
  t.equal(s.dayName(), 'sunday', 'sunday is new')
  t.equal(s.day(), 0, 'sunday is 0')
  t.equal(s.date(), 26, 'sunday went backwards')

  //check if it survives a clone
  let b = s.clone()
  b = b.startOf('week')
  t.equal(b.dayName(), 'sunday', 'still sunday')

  //test endof
  b = b.endOf('week')
  t.equal(b.dayName(), 'saturday', 'saturday is endof week now')

  //a new spacetime object is uneffected
  let s2 = spacetime('may 30 2019', 'Canada/Eastern')
  s2 = s2.startOf('week')
  t.equal(s2.dayName(), 'monday', 'monday is still the default')
  t.end()
})

test('named weekStart', t => {
  let s = spacetime('june 1 2019', 'Europe/Berlin')

  s = s.weekStart('thursday')
  s = s.startOf('week')
  t.equal(s.dayName(), 'thursday', 'starts thursday')

  s = s.weekStart('wednesday')
  s = s.startOf('week')
  t.equal(s.dayName(), 'wednesday', 'starts wednesday')

  s = s.weekStart('sat')
  s = s.startOf('week')
  t.equal(s.dayName(), 'saturday', 'starts saturday')

  s = s.weekStart(' FRi  ')
  s = s.startOf('week')
  t.equal(s.dayName(), 'friday', 'starts friday')

  t.end()
})
