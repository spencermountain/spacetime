import test from 'tape'
import spacetime from '../_lib/index.js'

test('round the final result when the starting time is not on a boundary', (t) => {
  const cases = [
    ['2025-06-18T10:45:00Z', 0.5, 'day', '2025-06-18T23:00:00.000Z'],
    ['2025-06-18T10:15:00Z', 0.5, 'day', '2025-06-18T22:00:00.000Z'],
    ['2025-06-18T10:30:00Z', 0.5, 'day', '2025-06-18T22:00:00.000Z'],
    ['2025-06-18T10:45:00Z', -0.5, 'day', '2025-06-17T23:00:00.000Z'],
    ['2025-06-18T10:20:45Z', 0.5, 'hour', '2025-06-18T10:51:00.000Z'],
    ['2025-06-18T10:20:15Z', 0.5, 'hour', '2025-06-18T10:50:00.000Z'],
    ['2025-06-18T10:20:15.750Z', 0.5, 'minute', '2025-06-18T10:20:46.000Z'],
    ['2025-06-18T10:20:15.250Z', 0.5, 'minute', '2025-06-18T10:20:45.000Z'],
    ['2025-06-18T10:20:15.750Z', -0.5, 'minute', '2025-06-18T10:19:46.000Z'],
    ['2025-06-18T10:00:00Z', 0.5, 'month', '2025-07-02T00:00:00.000Z'],
    ['2025-06-18T18:00:00Z', 0.5, 'month', '2025-07-03T00:00:00.000Z']
  ]
  cases.forEach(([input, amount, unit, expected]) => {
    const s = spacetime(input, 'UTC')
    t.equal(s.add(amount, unit).iso(), expected, `${input} + ${amount} ${unit}: round the final time`)
    t.equal(s.subtract(-amount, unit).iso(), expected, 'subtracting the opposite amount agrees')
    t.equal(s.epoch, Date.parse(input), 'rounding leaves the starting time unchanged')
  })
  const local = spacetime('2025-06-18T10:45:00', 'Asia/Kathmandu')
  t.equal(local.add(0.5, 'day').iso(), '2025-06-18T23:00:00.000+05:45', 'round to a local hour, not a UTC hour')
  t.end()
})

test('rounded decimal and whole-unit transforms give the same result', (t) => {
  const s = spacetime('2025-05-12T00:00:00.000Z', 'UTC')
  const cases = [
    [0.25, 'week', 2, 'days'],
    [0.75, 'weeks', 5, 'days'],
    [0.1, 'day', 2, 'hours'],
    [0.2, 'days', 5, 'hours']
  ]
  cases.forEach(([decimalAmount, decimalUnit, wholeAmount, wholeUnit]) => {
    const label = `${decimalAmount} ${decimalUnit} rounds to ${wholeAmount} ${wholeUnit}`
    t.equal(
      s.add(decimalAmount, decimalUnit).iso(),
      s.add(wholeAmount, wholeUnit).iso(),
      `from May 12: adding ${label}`
    )
    t.equal(
      s.subtract(decimalAmount, decimalUnit).iso(),
      s.subtract(wholeAmount, wholeUnit).iso(),
      `from May 12: subtracting ${label}`
    )
  })
  t.end()
})

test('half a year lands at the start of a date', (t) => {
  const years = [2020, 2021] // Leap year and common year.
  years.forEach((year) => {
    const s = spacetime(`${year}-01-01`, 'UTC').startOf('year')
    const expected = `${year}-07-02T00:00:00.000Z`
    t.equal(
      s.add(0.5, 'year').iso(),
      expected,
      `${year}: January 1 + half a year is July 2 at midnight`
    )
    t.equal(
      s.subtract(-0.5, 'years').iso(),
      expected,
      `${year}: subtracting a negative half year gives the same date`
    )
  })
  t.end()
})

test('round to the nearest subunit', (t) => {
  const start = '2023-04-01T00:00:00.000Z'
  // Avoid midpoint ties: these exercise rounding in both directions.
  const cases = [
    // 1.75 days rounds to 2 days; 5.25 days rounds to 5 days.
    [0.25, 'week', '2023-04-03T00:00:00.000Z'],
    [0.75, 'weeks', '2023-04-06T00:00:00.000Z'],
    [-0.25, 'week', '2023-03-30T00:00:00.000Z'],
    [-0.75, 'weeks', '2023-03-27T00:00:00.000Z'],
    // 2.4 hours rounds to 2 hours; 4.8 hours rounds to 5 hours.
    [0.1, 'day', '2023-04-01T02:00:00.000Z'],
    [0.2, 'days', '2023-04-01T05:00:00.000Z'],
    [-0.1, 'day', '2023-03-31T22:00:00.000Z'],
    [-0.2, 'days', '2023-03-31T19:00:00.000Z'],
    // 7.38 minutes rounds to 7 minutes; 7.74 minutes rounds to 8 minutes.
    [0.123, 'hour', '2023-04-01T00:07:00.000Z'],
    [0.129, 'hours', '2023-04-01T00:08:00.000Z'],
    // The same rounding applies when converting minutes to seconds.
    [0.123, 'minute', '2023-04-01T00:00:07.000Z'],
    [0.129, 'minutes', '2023-04-01T00:00:08.000Z']
  ]
  cases.forEach(([amount, unit, expected]) => {
    const s = spacetime(start, 'UTC')
    t.equal(
      s.add(amount, unit).iso(),
      expected,
      `April 1 + ${amount} ${unit}, rounded to the nearest subunit`
    )
    t.equal(
      s.subtract(-amount, unit).iso(),
      expected,
      `April 1 - ${-amount} ${unit}, rounded to the nearest subunit`
    )
  })
  t.end()
})
