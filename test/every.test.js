'use strict'
const test = require('tape')
const spacetime = require('./lib')

test('every-unit', t => {
  let start = spacetime('April 6th 2019', 'Europe/Paris')
  let end = spacetime('April 20th 2019', 'Europe/Paris')

  let days = start.every('day', end)
  t.equal(days.length, 13, '13 days')
  t.equal(days[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  let weeks = start.every(' weEK ', end)
  t.equal(weeks.length, 2, '2 weeks')

  let years = start.every('years', end)
  t.equal(years.length, 0, '0 years')

  t.end()
})
