import test from 'tape'
import spacetime from '../_lib/index.js'

test('invalid dates stay invalid through transformations', t => {
  const inputs = ['not a date', NaN, new Date(NaN)]
  const operations = [
    ['clone', s => s.clone()],
    ['add one day', s => s.add(1, 'day')],
    ['subtract one month', s => s.subtract(1, 'month')],
    ['set hour', s => s.hour(12)],
    ['set date', s => s.date(15)],
    ['set month', s => s.month(1)],
    ['set year', s => s.year(2024)],
    ['goto Kathmandu', s => s.goto('Asia/Kathmandu')],
    ['start of day', s => s.startOf('day')],
    ['end of month', s => s.endOf('month')],
    ['nearest hour', s => s.nearest('hour')]
  ]
  inputs.forEach(input => {
    operations.forEach(([operation, apply]) => {
      const s = spacetime(input, 'UTC')
      const result = apply(s)
      const label = `${String(input)} UTC: ${operation}`
      t.equal(result.isValid(), false, `${label} stays invalid`)
      t.equal(s.isValid(), false, `${label} leaves the source invalid`)
      t.equal(result.format('iso'), '', `${label} has no ISO representation`)
      t.equal(result.epochSeconds(), null, `${label} has no epoch seconds`)
    })
  })
  t.end()
})

test('invalid dates do not compare equal, before, after, or between', t => {
  const invalid = spacetime('not a date', 'UTC')
  const before = spacetime('2024-01-01', 'UTC')
  const after = spacetime('2024-02-01', 'UTC')
  const cases = [
    ['invalid isBefore valid', () => invalid.isBefore(before)],
    ['valid isBefore invalid', () => before.isBefore(invalid)],
    ['invalid isAfter valid', () => invalid.isAfter(before)],
    ['valid isAfter invalid', () => before.isAfter(invalid)],
    ['invalid isEqual valid', () => invalid.isEqual(before)],
    ['invalid isEqual invalid', () => invalid.isEqual(invalid.clone())],
    ['invalid isSame valid day', () => invalid.isSame(before, 'day')],
    ['valid isSame invalid day', () => before.isSame(invalid, 'day')],
    ['invalid isBetween valid bounds', () => invalid.isBetween(before, after)],
    ['valid isBetween invalid lower bound', () => before.isBetween(invalid, after)],
    ['valid isBetween invalid upper bound', () => after.isBetween(before, invalid)]
  ]
  cases.forEach(([label, compare]) => t.equal(compare(), false, label))
  t.end()
})
