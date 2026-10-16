import test from 'tape'
import spacetime from '../_lib/index.js'

test('mixed fractional months clamp the whole month before adding the remainder', (t) => {
  const cases = [
    ['2024-01-31', 1.5, '2024-03-14'],
    ['2023-01-31', 1.5, '2023-03-14'],
    ['2024-03-31', -1.5, '2024-02-15'],
    ['2023-03-31', -1.5, '2023-02-14'],
    ['2024-01-31', -1.5, '2023-12-17'],
    ['2024-01-31', 2.25, '2024-04-07'],
    ['2024-12-31', 1.5, '2025-02-14']
  ]
  cases.forEach(([input, amount, expected]) => {
    const s = spacetime(input, 'UTC')
    const midnight = `${expected}T00:00:00.000Z`
    t.equal(s.add(amount, 'months').iso(), midnight, `${input} + ${amount} months`)
    t.equal(s.subtract(-amount, 'months').iso(), midnight, `${input} - ${-amount} months`)
    t.equal(s.iso(), `${input}T00:00:00.000Z`, 'the original date is unchanged')
  })
  t.end()
})

test('fractional years starting on leap day round to midnight', (t) => {
  const s = spacetime('2024-02-29', 'UTC')
  const cases = [
    [0.5, '2024-08-29'],
    [-0.5, '2023-08-30'],
    [1.5, '2025-08-29'],
    [-1.5, '2022-08-29']
  ]
  cases.forEach(([amount, expected]) => {
    const midnight = `${expected}T00:00:00.000Z`
    t.equal(s.add(amount, 'years').iso(), midnight, `February 29 + ${amount} years`)
    t.equal(s.subtract(-amount, 'years').iso(), midnight, `February 29 - ${-amount} years`)
  })
  t.end()
})
