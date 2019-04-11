'use strict'
const test = require('tape')
const spacetime = require('./lib')

test('large date numbers', function(t) {
  let d = spacetime([2019, 'february'])
  d = d.date(30)
  t.equal(d.date(), 28, 'feb is <= 28')

  d = spacetime([2019, 'june'])
  d = d.date(300)
  t.equal(d.date(), 30, 'june is <= 30')
  t.end()
})

test('small date numbers', function(t) {
  let d = spacetime([2019, 'february'])
  d = d.date(0)
  t.equal(d.date(), 1, 'date is >= 1')

  d = d.date(-10)
  t.equal(d.date(), 1, 'date is still >= 1')
  t.end()
})

test('large month numbers', function(t) {
  let d = spacetime([2019])
  d = d.month(14)
  t.equal(d.monthName(), 'december', 'month is <= december')

  d = spacetime([2019])
  d = d.month(-14)
  t.equal(d.monthName(), 'january', 'month is >= january')
  t.end()
})
