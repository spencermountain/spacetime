import test from 'tape'
import spacetime from '../_lib/index.js'

test('overflow strings are rejected while calendar arrays and objects clamp', t => {
  const options = { today: { year: 2024, month: 5, date: 15, hour: 12, minute: 0, second: 0, millisecond: 0 } }
  const cases = [
    ['February 30', '2024-02-29T12:00:00.000Z', '2024-02-30T12:00:00', [2024, 1, 30, 12], { year: 2024, month: 1, date: 30, hour: 12 }],
    ['month 12', '2024-12-15T12:00:00.000Z', '2024-13-15T12:00:00', [2024, 12, 15, 12], { year: 2024, month: 12, date: 15, hour: 12 }],
    ['hour 24', '2024-06-15T23:00:00.000Z', '2024-06-15T24:00:00', [2024, 5, 15, 24], { year: 2024, month: 5, date: 15, hour: 24 }],
    ['negative month', '2024-01-15T12:00:00.000Z', '2024-00-15T12:00:00', [2024, -1, 15, 12], { year: 2024, month: -1, date: 15, hour: 12 }],
    ['negative date', '2024-06-01T12:00:00.000Z', null, [2024, 5, -1, 12], { year: 2024, month: 5, date: -1, hour: 12 }],
    ['negative hour', '2024-06-15T00:00:00.000Z', null, [2024, 5, 15, -1], { year: 2024, month: 5, date: 15, hour: -1 }]
  ]
  cases.forEach(([label, expected, ...inputs]) => {
    inputs.forEach((input, index) => {
      if (input === null) {
        return
      }
      const result = spacetime(input, 'UTC', options)
      if (index === 0) {
        t.equal(result.isValid(), false, `${label}: string rejects overflow`)
      } else {
        t.equal(result.iso(), expected, `${label}, ${['string', 'array', 'object'][index]}: clamps`)
      }
    })
  })
  t.end()
})

test('overflow setters clamp and leave their receiver unchanged', t => {
  const source = spacetime('2024-02-15T12:00:00.000Z', 'UTC')
  const before = source.iso()
  const cases = [
    ['date', 30, '2024-02-29T12:00:00.000Z'],
    ['month', 12, '2024-12-15T12:00:00.000Z'],
    ['hour', 24, '2024-02-15T23:00:00.000Z'],
    ['month', -1, '2024-01-15T12:00:00.000Z'],
    ['date', -1, '2024-02-01T12:00:00.000Z'],
    ['hour', -1, '2024-02-15T00:00:00.000Z']
  ]
  cases.forEach(([unit, value, expected]) => {
    const result = source[unit](value)
    t.equal(result.iso(), expected, `${unit}(${value}): clamps`)
    t.notEqual(result, source, `${unit}(${value}): distinct result`)
    t.equal(source.iso(), before, `${unit}(${value}): receiver unchanged`)
  })
  t.end()
})
