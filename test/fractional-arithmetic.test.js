import test from 'tape'
import spacetime from '../src/index.js'

test('decimal and whole-unit transforms give the same result', (t) => {
  const s = spacetime('2024-08-08T00:00:00.000Z', 'UTC')
  // Decimal amount and unit, followed by the equivalent whole amount and unit.
  const cases = [
    // Days to hours: halves, quarters, eighths, and mixed whole amounts.
    [0.5, 'day', 12, 'hour'],
    [0.25, 'day', 6, 'hours'],
    [0.75, 'days', 18, 'hours'],
    [0.125, 'day', 3, 'hours'],
    [0.375, 'days', 9, 'hours'],
    [0.625, 'days', 15, 'hours'],
    [0.875, 'days', 21, 'hours'],
    [1.25, 'days', 30, 'hours'],
    [1.5, 'days', 36, 'hours'],
    [2.5, 'days', 60, 'hours'],
    [3.75, 'days', 90, 'hours'],
    [-0.5, 'day', -12, 'hours'],
    [-0.25, 'days', -6, 'hours'],
    [-1.5, 'days', -36, 'hours'],
    [-2.75, 'days', -66, 'hours'],
    // Hours to minutes, including decimal tenths.
    [0.5, 'hour', 30, 'minutes'],
    [0.25, 'hour', 15, 'minutes'],
    [0.75, 'hours', 45, 'minutes'],
    [0.1, 'hour', 6, 'minutes'],
    [0.2, 'hours', 12, 'minutes'],
    [0.05, 'hour', 3, 'minutes'],
    [0.3, 'hours', 18, 'minutes'],
    [0.4, 'hours', 24, 'minutes'],
    [1.25, 'hours', 75, 'minutes'],
    [1.5, 'hours', 90, 'minutes'],
    [2.75, 'hours', 165, 'minutes'],
    [-0.25, 'hour', -15, 'minutes'],
    [-0.5, 'hours', -30, 'minutes'],
    [-1.1, 'hours', -66, 'minutes'],
    // Minutes to seconds.
    [0.5, 'minute', 30, 'seconds'],
    [0.25, 'minute', 15, 'seconds'],
    [0.75, 'minutes', 45, 'seconds'],
    [0.1, 'minute', 6, 'seconds'],
    [0.2, 'minutes', 12, 'seconds'],
    [0.05, 'minute', 3, 'seconds'],
    [0.3, 'minutes', 18, 'seconds'],
    [0.4, 'minutes', 24, 'seconds'],
    [1.25, 'minutes', 75, 'seconds'],
    [1.5, 'minutes', 90, 'seconds'],
    [2.75, 'minutes', 165, 'seconds'],
    [-0.25, 'minute', -15, 'seconds'],
    [-0.5, 'minutes', -30, 'seconds'],
    [-1.1, 'minutes', -66, 'seconds'],
    // Seconds to milliseconds, down to one millisecond.
    [0.5, 'second', 500, 'milliseconds'],
    [0.25, 'second', 250, 'milliseconds'],
    [0.75, 'seconds', 750, 'milliseconds'],
    [0.1, 'second', 100, 'milliseconds'],
    [0.01, 'seconds', 10, 'milliseconds'],
    [0.001, 'second', 1, 'millisecond'],
    [0.125, 'seconds', 125, 'milliseconds'],
    [0.007, 'second', 7, 'milliseconds'],
    [0.333, 'seconds', 333, 'milliseconds'],
    [1.001, 'seconds', 1001, 'milliseconds'],
    [-0.007, 'second', -7, 'milliseconds'],
    [1.5, 'seconds', 1500, 'milliseconds'],
    [2.75, 'seconds', 2750, 'milliseconds'],
    [-0.001, 'second', -1, 'millisecond'],
    [-0.25, 'seconds', -250, 'milliseconds'],
    [-1.5, 'seconds', -1500, 'milliseconds'],
    // The agreed half-month duration is exactly two weeks.
    [0.5, 'month', 14, 'days'],
    [0.5, 'months', 2, 'weeks'],
    [-0.5, 'month', -14, 'days'],
    [-0.5, 'months', -2, 'weeks'],
    [0.25, 'month', 7, 'days'],
    [0.75, 'months', 21, 'days'],
    // Aliases use the same decimal arithmetic.
    [0.5, 'date', 12, 'hours'],
    [0.5, 'min', 30, 'seconds'],
    [0.5, 'fortnight', 1, 'week'],
    [0.2, 'quarterHour', 3, 'minutes'],
    [0.4, 'quarter-hour', 6, 'minutes'],
    // Larger units with exact whole-year equivalents.
    [0.1, 'decade', 1, 'year'],
    [0.5, 'decade', 5, 'years'],
    [1.5, 'decades', 15, 'years'],
    [-0.5, 'decades', -5, 'years'],
    [0.01, 'century', 1, 'year'],
    [0.25, 'century', 25, 'years'],
    [0.5, 'centuries', 50, 'years'],
    [-0.25, 'centuries', -25, 'years'],
    [0.001, 'millennium', 1, 'year'],
    [0.1, 'millennium', 100, 'years'],
    [0.5, 'millennium', 500, 'years'],
    [-0.1, 'millennium', -100, 'years']
  ]
  cases.forEach(([decimalAmount, decimalUnit, wholeAmount, wholeUnit]) => {
    const label = `${decimalAmount} ${decimalUnit} equals ${wholeAmount} ${wholeUnit}`
    t.equal(
      s.add(decimalAmount, decimalUnit).iso(),
      s.add(wholeAmount, wholeUnit).iso(),
      `from August 8: adding ${label}`
    )
    t.equal(
      s.subtract(decimalAmount, decimalUnit).iso(),
      s.subtract(wholeAmount, wholeUnit).iso(),
      `from August 8: subtracting ${label}`
    )
  })
  t.end()
})

test('decimal transforms agree across timezones and DST changes', (t) => {
  const starts = [
    ['2024-03-09T18:00:00', 'America/New_York'], // Spring forward.
    ['2024-03-10T06:00:00', 'America/New_York'], // Subtract across the change.
    ['2024-11-02T18:00:00', 'America/New_York'], // Fall back.
    ['2024-11-03T06:00:00', 'America/New_York'],
    ['2024-03-31T00:00:00', 'Europe/London'],
    ['2024-04-07T00:00:00', 'Australia/Sydney'],
    ['2024-07-01T00:00:00', 'Asia/Kathmandu'], // Quarter-hour offset.
    ['2024-09-01T00:00:00', 'Asia/Kolkata'] // Half-hour offset.
  ]
  const cases = [
    [0.5, 'day', 12, 'hours'],
    [1.5, 'days', 36, 'hours'],
    [0.25, 'hour', 15, 'minutes'],
    [2.5, 'hours', 150, 'minutes'],
    [0.5, 'minute', 30, 'seconds'],
    [0.125, 'second', 125, 'milliseconds']
  ]
  starts.forEach(([input, zone]) => {
    const s = spacetime(input, zone)
    const original = s.iso()
    cases.forEach(([amount, unit, wholeAmount, wholeUnit]) => {
      const label = `${input} in ${zone}: ${amount} ${unit} equals ${wholeAmount} ${wholeUnit}`
      const added = s.add(amount, unit)
      t.equal(added.iso(), s.add(wholeAmount, wholeUnit).iso(), `add from ${label}`)
      t.equal(s.subtract(amount, unit).iso(), s.subtract(wholeAmount, wholeUnit).iso(), `subtract from ${label}`)
      t.equal(added.tz, s.tz, `${label}: keeps the timezone`)
    })
    t.equal(s.iso(), original, `${input} in ${zone}: original is unchanged`)
  })
  t.end()
})

test('fractional additions cross calendar boundaries', (t) => {
  const cases = [
    ['2023-12-31T18:00:00Z', 0.5, 'day', '2024-01-01T06:00:00.000Z'],
    ['2024-01-01T06:00:00Z', -0.5, 'day', '2023-12-31T18:00:00.000Z'],
    ['2024-02-28T18:00:00Z', 0.5, 'day', '2024-02-29T06:00:00.000Z'],
    ['2023-02-28T18:00:00Z', 0.5, 'day', '2023-03-01T06:00:00.000Z'],
    ['2024-03-01T06:00:00Z', -0.5, 'day', '2024-02-29T18:00:00.000Z'],
    ['2025-01-31T23:45:00Z', 0.5, 'hour', '2025-02-01T00:15:00.000Z'],
    ['2025-02-01T00:15:00Z', -0.5, 'hour', '2025-01-31T23:45:00.000Z'],
    ['2025-04-30T23:59:45Z', 0.5, 'minute', '2025-05-01T00:00:15.000Z'],
    ['2025-05-01T00:00:15Z', -0.5, 'minute', '2025-04-30T23:59:45.000Z'],
    ['2025-12-31T23:59:59.750Z', 0.5, 'second', '2026-01-01T00:00:00.250Z'],
    ['2026-01-01T00:00:00.250Z', -0.5, 'second', '2025-12-31T23:59:59.750Z']
  ]
  cases.forEach(([input, amount, unit, expected]) => {
    const s = spacetime(input, 'UTC')
    t.equal(s.add(amount, unit).iso(), expected, `${input} + ${amount} ${unit}`)
    t.equal(s.subtract(-amount, unit).iso(), expected, `${input} - ${-amount} ${unit}`)
  })
  t.end()
})

test('repeated exact fractions equal one whole unit', (t) => {
  const s = spacetime('2019-10-10T00:00:00.000Z', 'UTC')
  // Only include combinations that do not lose precision at each step.
  const cases = [
    {
      amount: 0.5, repeats: 2,
      units: ['millisecond', 'second', 'minute', 'hour', 'day', 'quarter', 'decade', 'century', 'millennium']
    },
    {
      amount: 0.25, repeats: 4,
      units: ['millisecond', 'second', 'minute', 'hour', 'day', 'quarter', 'century', 'millennium']
    },
    {
      amount: 0.1, repeats: 10,
      units: ['millisecond', 'second', 'minute', 'hour', 'decade', 'century', 'millennium']
    }
  ]
  cases.forEach(({ amount, repeats, units }) => {
    units.forEach((unit) => {
      let result = s
      for (let i = 0; i < repeats; i += 1) {
        result = result.add(amount, unit)
      }
      t.equal(
        result.iso(),
        s.add(1, unit).iso(),
        `from October 10: ${repeats} additions of ${amount} ${unit} equal adding 1 ${unit}`
      )
    })
  })
  t.end()
})

test('keep the fractional part as smaller units', (t) => {
  const start = '2020-06-15T00:00:00.000Z'
  const cases = [
    // Days become hours.
    [0.5, 'day', '2020-06-15T12:00:00.000Z'],
    [1.5, 'days', '2020-06-16T12:00:00.000Z'],
    [2.5, 'days', '2020-06-17T12:00:00.000Z'],
    [-0.5, 'day', '2020-06-14T12:00:00.000Z'],
    [-1.5, 'days', '2020-06-13T12:00:00.000Z'],
    // Hours become minutes.
    [0.5, 'hour', '2020-06-15T00:30:00.000Z'],
    [1.5, 'hours', '2020-06-15T01:30:00.000Z'],
    [-0.5, 'hour', '2020-06-14T23:30:00.000Z'],
    // Minutes become seconds.
    [0.5, 'minute', '2020-06-15T00:00:30.000Z'],
    [1.5, 'minutes', '2020-06-15T00:01:30.000Z'],
    [-0.5, 'minute', '2020-06-14T23:59:30.000Z'],
    // Seconds become milliseconds.
    [0.5, 'second', '2020-06-15T00:00:00.500Z'],
    [1.5, 'seconds', '2020-06-15T00:00:01.500Z'],
    [-0.5, 'second', '2020-06-14T23:59:59.500Z']
  ]
  cases.forEach(([amount, unit, expected]) => {
    const s = spacetime(start, 'UTC')
    t.equal(s.add(amount, unit).iso(), expected, `June 15 + ${amount} ${unit}`)
    t.equal(s.subtract(-amount, unit).iso(), expected, `June 15 - ${-amount} ${unit}`)
    t.equal(s.iso(), start, `adding or subtracting ${amount} ${unit} leaves the original unchanged`)
  })
  t.end()
})

test('adding and subtracting the same amount returns to the start', (t) => {
  const start = '2022-12-20T12:00:00.000Z'
  const s = spacetime(start, 'UTC')
  const reversibleUnits = ['day', 'hour', 'minute', 'second']
  const amounts = [0.5, 1.5, 2.5]
  reversibleUnits.forEach((unit) => {
    amounts.forEach((amount) => {
      t.equal(
        s.add(amount, unit).subtract(amount, unit).iso(),
        start,
        `add then subtract ${amount} ${unit}: back to December 20 at noon`
      )
      t.equal(
        s.subtract(amount, unit).add(amount, unit).iso(),
        start,
        `subtract then add ${amount} ${unit}: back to December 20 at noon`
      )
    })
  })
  t.end()
})

test('half a month is two weeks', (t) => {
  const cases = [
    { from: '2020-09-10', plus14Days: '2020-09-24', minus14Days: '2020-08-27' },
    { from: '2020-01-25', plus14Days: '2020-02-08', minus14Days: '2020-01-11' },
    { from: '2020-02-20', plus14Days: '2020-03-05', minus14Days: '2020-02-06' },
    { from: '2021-02-20', plus14Days: '2021-03-06', minus14Days: '2021-02-06' }
  ]
  const zones = ['UTC', 'Asia/Kathmandu']
  zones.forEach((zone) => {
    cases.forEach(({ from, plus14Days, minus14Days }) => {
      const s = spacetime(from, zone).startOf('day')
      const forward = s.add(0.5, 'month')
      const backward = s.subtract(0.5, 'months')
      const label = `${from} in ${zone}`
      t.equal(
        forward.iso(),
        spacetime(plus14Days, zone).startOf('day').iso(),
        `${label}: half a month later is 14 days later at midnight`
      )
      t.equal(
        backward.iso(),
        spacetime(minus14Days, zone).startOf('day').iso(),
        `${label}: half a month earlier is 14 days earlier at midnight`
      )
      t.equal(
        s.add(-0.5, 'months').iso(),
        backward.iso(),
        `${label}: adding -0.5 months agrees with subtracting 0.5 months`
      )
      t.equal(
        forward.subtract(0.5, 'month').iso(),
        s.iso(),
        `${label}: forward half a month and back returns to the start`
      )
      t.equal(
        backward.add(0.5, 'month').iso(),
        s.iso(),
        `${label}: back half a month and forward returns to the start`
      )
      t.equal(forward.tz, s.tz, `${label}: adding half a month keeps the timezone`)
    })
  })
  t.end()
})
