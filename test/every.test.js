import test from 'tape'
import spacetime from './lib/index.js'

test('every-unit', (t) => {
  let start = spacetime('April 6th 2019', 'Europe/Paris')
  let end = spacetime('April 20th 2019', 'Europe/Paris').add(1, 'hour')

  let days = start.every('day', end)
  t.equal(days.length, 15, '15 days')
  t.equal(days[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  let weeks = start.every(' weEK ', end)
  t.equal(weeks.length, 2, '2 weeks')

  let years = start.every('years', end)
  t.equal(years.length, 0, '0 years')

  t.end()
})

test('step-count', (t) => {
  let start = spacetime('April 6th 2019', 'Europe/Paris')
  let end = spacetime('April 20th 2019', 'Europe/Paris').add(3, 'years')

  let biannualInterval = start.every('quarter', end, 2)
  t.equal(biannualInterval.length, 6, 'every 2 quarters')
  t.equal(biannualInterval[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  let fortnights = start.every('week', end, 2)
  t.equal(fortnights.length, 80, 'every fortnight')
  t.equal(biannualInterval[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  let everyFourYears = start.every('years', end, 4)
  t.equal(everyFourYears.length, 0, 'interval/step count too large for range')

  t.end()
})

test('monday-sunday', (t) => {
  let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  let start = spacetime('April 8th 2019').startOf('week')
  let end = start.endOf('week')
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
