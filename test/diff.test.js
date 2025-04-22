import test from 'tape'
import spacetime from './lib/index.js'

const numbers = [1, 2, 5, 7, 15, 30, 40, 100, 110]
const units = ['day', 'week', 'month', 'quarter', 'year']

test('simple-diff', (t) => {
  let a = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern')
  let b = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  t.equal(a.diff(b, 'day'), 2, '2-days')
  a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  b = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern')
  t.equal(a.diff(b, 'day'), -2, '-2-days')
  t.end()
})

test('all-diff', (t) => {
  const a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  units.forEach((unit) => {
    numbers.forEach((num) => {
      const b = a.clone().add(num, unit)
      t.equal(a.diff(b, unit), num, num + '-' + unit)
    })
  })
  t.end()
})

test('diff-small', (t) => {
  const a = spacetime('July 27 2018')
  const b = a.clone().minus(20, 'seconds')
  const obj = b.diff(a)
  t.equal(obj.milliseconds, 20000, 'small-ms')
  t.equal(obj.seconds, 20, 'small-s')
  t.equal(obj.hours, 0, 'small-hour')
  t.equal(obj.days, 0, 'small-day')
  t.equal(obj.weeks, 0, 'small-weeks')
  t.equal(obj.months, 0, 'small-months')
  t.equal(obj.years, 0, 'small-years')
  t.end()
})

test('diff-big', (t) => {
  const a = spacetime('July 27 2018')
  const b = a.clone().minus(20, 'years')
  const obj = b.diff(a)
  t.equal(obj.milliseconds, 631152000000, 'big-ms')
  t.equal(obj.seconds, 631152000, 'big-s')
  t.equal(obj.hours, 175320, 'big-hour')
  t.equal(obj.days, 7305, 'big-day')
  // t.equal(obj.weeks, 1044, 'big-weeks') //some side-effect of making 'add' dst awareness
  t.equal(obj.months, 240, 'big-months')
  t.equal(obj.years, 20, 'big-years')
  t.end()
})

test('diff-awkward', (t) => {
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

test('year-diff-short', (t) => {
  // only 10 months apart
  const start = spacetime('Dec 25th 2019')
  const end = start.add(10, 'months')

  const months = start.diff(end, 'months')
  t.equal(months, 10, '10 months')

  let year = start.diff(end, 'year')
  t.equal(year, 0, '10 months is not a year')

  year = start.diff(end).years
  t.equal(year, 0, '10 months is (still) not a year')
  t.end()
})

test('year-diff-enough', (t) => {
  // fully >13 months apart
  const start = spacetime('Feb 25th 2019')
  const end = start.add(13, 'months')

  const months = start.diff(end, 'months')
  t.equal(months, 13, '13 months')

  let year = start.diff(end, 'year')
  t.equal(year, 1, '13 months is one year')

  year = start.diff(end).years
  t.equal(year, 1, '13 months is (still) one year')
  t.end()
})

test('quick-diff-45-months', (t) => {
  const start = spacetime('Feb 25th 2019')
  const end = start.add(45, 'months')

  const obj = start.diff(end)
  t.equal(obj.months, 45, '45-months')

  Object.keys(obj).forEach((k) => {
    const val = start.diff(end, k)
    t.equal(obj[k], val, 'diff #1 -' + k)
  })
  t.end()
})

test('quick-diff-18-weeks', (t) => {
  const start = spacetime('June 25th 2019')
  const end = start.minus(18, 'weeks')

  const obj = start.diff(end)
  t.equal(obj.weeks, -18, '18-weeks')
  Object.keys(obj).forEach((k) => {
    const val = start.diff(end, k)
    t.equal(obj[k], val, 'diff #2 -' + k)
  })
  t.end()
})

test('quick-diff-13-minutes', (t) => {
  const start = spacetime('Feb 25th 2019')
  const end = start.add(13, 'minutes')

  const obj = start.diff(end)
  Object.keys(obj).forEach((k) => {
    const val = start.diff(end, k)
    t.equal(obj[k], val, 'diff #3 -' + k)
  })
  t.end()
})

test('diff-timezone same time', (t) => {
  const east = spacetime('oct 1st 2020 11:00am', 'Canada/Eastern')
  const west = spacetime('oct 1st 2020 8:00am', 'Canada/Pacific')
  const diff = east.since(west).diff
  t.equal(diff.days, 0, 'same-day')
  t.equal(diff.hours, 0, 'same-hour')
  t.equal(diff.minutes, 0, 'same-min')
  t.equal(diff.seconds, 0, 'same-sec')
  t.end()
})

test('diff-timezone almost same time', (t) => {
  const east = spacetime('oct 1st 2020 10:00am', 'Canada/Eastern')
  const west = spacetime('oct 1st 2020 8:00am', 'Canada/Pacific')
  const diff = east.since(west).diff
  t.equal(diff.days, 0, 'same-day')
  t.equal(diff.hours, -1, 'almost same-hour')
  t.equal(diff.minutes, 0, 'same-min')
  t.equal(diff.seconds, 0, 'same-sec')
  t.end()
})

test('diff-timezone equal times', (t) => {
  const east = spacetime('oct 1st 2020 8:00am', 'Canada/Eastern')
  const west = spacetime('oct 1st 2020 8:00am', 'Canada/Pacific')
  const diff = east.since(west).diff
  t.equal(diff.days, 0, 'same-day')
  t.equal(diff.hours, -3, 'hour diff')
  t.equal(diff.minutes, 0, 'same-min')
  t.equal(diff.seconds, 0, 'same-sec')
  t.end()
})

test('i18n', (t) => {
  const start = spacetime('Dec 25th 2021')
  const end = spacetime('Feb 2nd 2022')

  const translationValues = {
    units: {
      secondWord: 'segundo',
      secondWordPlural: 'segundos',
      minuteWord: 'minuto',
      minuteWordPlural: 'minutos',
      hourWord: 'hora',
      hourWordPlural: 'horas',
      dayWord: 'dia',
      dayWordPlural: 'dias',
      monthWord: 'mes',
      monthWordPlural: 'meses',
      yearWord: 'año',
      yearWordPlural: 'años'
    }
  }

  start.i18n(translationValues)
  end.i18n(translationValues)

  const diff = start.since(end).diff
  t.equal(diff.days, -8, 'same-day')
  t.equal(diff.hours, 0, 'hour diff')
  t.equal(diff.minutes, 0, 'same-min')
  t.equal(diff.seconds, 0, 'same-sec')
  t.end()
})
