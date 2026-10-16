import test from 'tape'
import spacetime from '../_lib/index.js'

test('every-unit', (t) => {
  const start = spacetime('April 6th 2019', 'Europe/Paris')
  const end = spacetime('April 20th 2019', 'Europe/Paris').add(1, 'hour')

  const days = start.every('day', end)
  t.equal(days.length, 15, '15 days')
  t.equal(days[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  const weeks = start.every(' weEK ', end)
  t.equal(weeks.length, 2, '2 weeks')

  const years = start.every('years', end)
  t.equal(years.length, 0, '0 years')

  t.end()
})

test('step-count', (t) => {
  const start = spacetime('April 6th 2019', 'Europe/Paris')
  const end = spacetime('April 20th 2019', 'Europe/Paris').add(3, 'years')

  const biannualInterval = start.every('quarter', end, 2)
  t.equal(biannualInterval.length, 6, 'every 2 quarters')
  t.equal(biannualInterval[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  const fortnights = start.every('week', end, 2)
  t.equal(fortnights.length, 80, 'every fortnight')
  t.equal(biannualInterval[0].timezone().name, 'Europe/Paris', 'results in right timezone')

  const everyFourYears = start.every('years', end, 4)
  t.equal(everyFourYears.length, 0, 'interval/step count too large for range')

  t.end()
})

test('monday-sunday', (t) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const start = spacetime('April 8th 2019').startOf('week')
  const end = start.endOf('week')
  const eachDay = start.every('day', end).map((d) => d.dayName())
  t.deepEqual(eachDay, days, 'got mon-sunday')
  t.end()
})

test('long-every is stable', (t) => {
  const d = spacetime('jan 1st 1872')
  d.every('year', 'jan 1st 1902').forEach((s) => {
    const year = s.year()
    t.equal(s.month(), 0, year + ' is-january')
    t.equal(s.date(), 1, year + ' is-first')
  })
  t.end()
})


test('every returns exact boundaries for short ranges', (t) => {
  // Include aligned starts, exclude ends, and iterate reversed ranges chronologically.
  const cases = [
    ['2024-04-01', '2024-04-01', 'day', 1, []],
    ['2024-04-03', '2024-04-01', 'day', 1,
      ['2024-04-01T00:00:00.000Z', '2024-04-02T00:00:00.000Z']],
    ['2024-04-01', '2024-04-03', 'day', 1,
      ['2024-04-01T00:00:00.000Z', '2024-04-02T00:00:00.000Z']],
    ['2024-04-01T12:00:00Z', '2024-04-03', 'day', 1,
      ['2024-04-02T00:00:00.000Z']],
    ['2024-04-01', '2024-04-02T23:59:59.999Z', 'day', 1,
      ['2024-04-01T00:00:00.000Z', '2024-04-02T00:00:00.000Z']],
    ['2024-04-01T12:00:00Z', '2024-04-01T13:00:00Z', 'day', 1, []],
    ['2024-04-01', '2024-04-05', 'day', 2,
      ['2024-04-01T00:00:00.000Z', '2024-04-03T00:00:00.000Z']],
    ['2024-02-28', '2024-03-01', 'day', 1,
      ['2024-02-28T00:00:00.000Z', '2024-02-29T00:00:00.000Z']],
    ['2024-01-15', '2024-04-01', 'month', 1,
      ['2024-02-01T00:00:00.000Z', '2024-03-01T00:00:00.000Z']]
  ]
  cases.forEach(([input, endInput, unit, step, expected]) => {
    const start = spacetime(input, 'UTC')
    const end = spacetime(endInput, 'UTC')
    const label = `${input} to ${endInput} UTC: every(${unit}, step ${step})`
    const dates = start.every(unit, end, step)
    t.deepEqual(dates.map(s => s.iso()), expected, label)
    t.equal(start.epoch, Date.parse(input), `${label} preserves start`)
    t.equal(end.epoch, Date.parse(endInput), `${label} preserves end`)
  })
  t.end()
})
