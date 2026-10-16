import test from 'tape'
import spacetime from '../_lib/index.js'

test('large date numbers', function (t) {
  let d = spacetime([2019, 'february'])
  d = d.date(30)
  t.equal(d.date(), 28, 'feb is <= 28')

  d = spacetime([2019, 'june'])
  d = d.date(300)
  t.equal(d.date(), 30, 'june is <= 30')

  d = spacetime([2022, 'december', 900])
  t.equal(d.date(), 31, 'dec is <= 31')
  t.end()
})

test('small date numbers', function (t) {
  let d = spacetime([2019, 'february'])
  d = d.date(0)
  t.equal(d.date(), 1, 'date is >= 1')

  d = d.date(-10)
  t.equal(d.date(), 1, 'date is still >= 1')

  d = spacetime([2022, 'december', 0])
  t.equal(d.date(), 1, 'dec is >= 1')

  t.end()
})

test('large month numbers', function (t) {
  let d = spacetime([2019])
  d = d.month(14)
  t.equal(d.monthName(), 'december', 'month is <= december')

  d = spacetime([2019])
  d = d.month(-14)
  t.equal(d.monthName(), 'january', 'month is >= january')

  d = spacetime([2019, 13, 5])
  t.equal(d.monthName(), 'december', 'array-set month is <= december')
  t.equal(d.date(), 5, 'date is still valid')
  t.end()
})


test('date setters clamp immediately outside each month', (t) => {
  const months = [
    [2023, 1, 28], [2024, 1, 29], [2024, 3, 30], [2024, 0, 31]
  ]
  months.forEach(([year, month, last]) => {
    const s = spacetime([year, month, 15, 12, 34, 56, 789], 'UTC')
    const cases = [[-1, 1], [0, 1], [1, 1], [2, 2], [last - 1, last - 1], [last, last], [last + 1, last]]
    cases.forEach(([input, expected]) => {
      const result = s.date(input)
      const label = `${year}-${month + 1} UTC: date(${input})`
      t.equal(result.date(), expected, `${label} clamps within the month`)
      t.deepEqual([result.year(), result.month(), result.hour(), result.minute(), result.second(), result.millisecond()],
        [year, month, 12, 34, 56, 789], `${label} preserves other fields`)
      t.equal(s.date(), 15, `${label} preserves the source`)
    })
  })
  t.end()
})

test('month setters clamp immediately outside zero-based bounds', (t) => {
  const s = spacetime('2024-06-15T12:34:56.789Z', 'UTC')
  const cases = [[-1, 0], [0, 0], [1, 1], [10, 10], [11, 11], [12, 11]]
  cases.forEach(([input, expected]) => {
    const result = s.month(input)
    const label = `2024-06-15 UTC: month(${input})`
    t.deepEqual([result.year(), result.month(), result.date()], [2024, expected, 15], label)
    t.equal(result.time(), '12:34pm', `${label} preserves local time`)
    t.equal(s.month(), 5, `${label} preserves the source`)
  })
  t.end()
})

test('month and year setters clamp February in common and leap years', (t) => {
  const cases = [
    ['2023-01-31T12:34:56.789Z', 'month', 1, '2023-02-28T12:34:56.789Z'],
    ['2024-01-31T12:34:56.789Z', 'month', 1, '2024-02-29T12:34:56.789Z'],
    ['2024-03-31T12:34:56.789Z', 'month', 1, '2024-02-29T12:34:56.789Z'],
    ['2024-02-29T12:34:56.789Z', 'year', 2023, '2023-02-28T12:34:56.789Z'],
    ['2024-02-29T12:34:56.789Z', 'year', 2028, '2028-02-29T12:34:56.789Z'],
    ['2000-02-29T12:34:56.789Z', 'year', 1900, '1900-02-28T12:34:56.789Z']
  ]
  cases.forEach(([input, method, value, expected]) => {
    const s = spacetime(input, 'UTC')
    const label = `${input} UTC: ${method}(${value})`
    t.equal(s[method](value).iso(), expected, label)
    t.equal(s.epoch, Date.parse(input), `${label} preserves the source`)
  })
  t.end()
})
