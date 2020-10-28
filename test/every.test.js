const test = require('tape')
const spacetime = require('./lib')

test('every-unit', (t) => {
  let start = spacetime('April 6th 2019', 'Europe/Paris')
  let end = spacetime('April 20th 2019', 'Europe/Paris').add(1, 'hour')

  let days = start.every('day', end)
  t.equal(days.length, 14, '14 days')
  t.equal(days[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  let weeks = start.every(' weEK ', end)
  t.equal(weeks.length, 2, '2 weeks')

  let years = start.every('years', end)
  t.equal(years.length, 0, '0 years')

  t.end()
})

test('monday-sunday', (t) => {
  let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  let start = spacetime('April 8th 2019').startOf('week')
  let end = start.endOf('week')
  start = start.minus(1, 'hour')
  let eachDay = start.every('day', end).map((d) => d.dayName())
  t.deepEqual(eachDay, days, 'got mon-sunday')
  t.end()
})

test('long-every is stable', (t) => {
  let d = spacetime('jan 1st 1872')
  d.every('year', 'jan 1st 1902').forEach((s) => {
    let year = s.year()
    t.equal(s.month(), 0, year + ' is-january')
    t.equal(s.date(), 1, year + ' is-first')
  })
  t.end()
})
