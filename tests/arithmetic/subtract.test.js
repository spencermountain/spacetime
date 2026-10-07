import test from 'tape'
import spacetime from '../_lib/index.js'

//
test('subtract', (t) => {
  let s = spacetime('January 1, 2016 1:20:05', 'Canada/Eastern')
  //initial state
  t.equal(s.date(), 1, '.date()')
  t.equal(s.month(), 0, '.month()')
  t.equal(s.year(), 2016, '.year()')
  t.equal(s.hour(), 1, '.hour()')
  t.equal(s.minute(), 20, '.minute()')

  s = s.subtract(1, 'month')
  t.equal(s.date(), 1, 'movemonth.date()')
  t.equal(s.month(), 11, 'movemonth.month()')
  t.equal(s.year(), 2015, 'movemonth.year()')

  s = s.subtract(2, 'days')
  t.equal(s.date(), 29, 'moveday.date()')
  t.equal(s.monthName(), 'november', 'moveday.month()')
  t.equal(s.year(), 2015, 'moveday.year()')
  t.equal(s.dayName(), 'sunday', 'moveday.day()')

  s = s.subtract(1, 'week')
  t.equal(s.date(), 22, 'moveweek.date()')
  t.equal(s.monthName(), 'november', 'moveweek.month()')
  t.equal(s.year(), 2015, 'moveweek.year()')
  t.equal(s.dayName(), 'sunday', 'moveweek.day()')

  s = s.subtract(1, 'year')
  t.equal(s.date(), 22, 'moveyear.date()')
  t.equal(s.monthName(), 'november', 'moveyear.month()')
  t.equal(s.year(), 2014, 'moveyear.year()')

  t.end()
})

test('subtract-rollover', (t) => {
  const input = '2010-01-01T01:20:05'
  const zone = 'Canada/Pacific'
  const s = spacetime(input, zone)
  const cases = [
    [8, 'hour', '2009-12-31', 17],
    [3, 'day', '2009-12-29', 1],
    [1, 'month', '2009-12-01', 1],
    [4, 'month', '2009-09-01', 1],
    [13, 'month', '2008-12-01', 1],
    [0, 'month', '2010-01-01', 1],
    [12, 'month', '2009-01-01', 1],
    [120, 'month', '2000-01-01', 1]
  ]
  cases.forEach(([amount, unit, date, hour]) => {
    const result = s.subtract(amount, unit)
    const label = `${input} ${zone}: subtract(${amount}, ${unit})`
    t.equal(result.format('iso-short'), date, `${label} sets the date`)
    t.deepEqual([result.hour(), result.minute(), result.second(), result.millisecond()],
      [hour, 20, 5, 0], `${label} preserves the local clock fields`)
  })
  t.end()
})

test('month subtraction across multiple years', (t) => {
  const input = '2022-01-01'
  const s = spacetime(input, 'UTC')
  const cases = [
    [0, '2022-01-01'], [12, '2021-01-01'], [24, '2020-01-01'],
    [36, '2019-01-01'], [48, '2018-01-01'],
    [1, '2021-12-01'], [13, '2020-12-01'], [25, '2019-12-01'],
    [37, '2018-12-01'], [49, '2017-12-01']
  ]
  cases.forEach(([months, expected]) => {
    t.equal(s.subtract(months, 'month').format('iso-short'), expected, `${input} UTC: subtract(${months}, month)`)
  })
  t.end()
})

test('subtract overflow', (t) => {
  const input = '2024-03-31T12:30:00Z'
  const s = spacetime(input, 'UTC')
  const cases = [[25, '2022-02-28T12:30:00.000Z'], [13, '2023-02-28T12:30:00.000Z']]
  cases.forEach(([months, expected]) => {
    t.equal(s.subtract(months, 'month').iso(), expected, `${input} UTC: subtract(${months}, month) clamps February`)
  })
  t.end()
})
