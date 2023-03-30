import test from 'tape'
import spacetime from './_lib.js'

test('every-unit', (t) => {
  let start = spacetime('April 6th 2019', 'Etc/GMT-8')
  let end = spacetime('April 20th 2019', 'Etc/GMT-8').add(1, 'hour')

  let days = start.every('day', end)
  t.equal(days.length, 15, '15 days')
  t.equal(days[0].timezone().name, 'Etc/GMT-8', 'results in right timezone')

  let weeks = start.every(' weEK ', end)
  t.equal(weeks.length, 2, '2 weeks')

  let years = start.every('years', end)
  t.equal(years.length, 0, '0 years')

  t.end()
})

test('monday-sunday', (t) => {
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
    t.equal(s.month(), 1, year + ' is-january')
    t.equal(s.date(), 1, year + ' is-first')
  })
  t.end()
})
