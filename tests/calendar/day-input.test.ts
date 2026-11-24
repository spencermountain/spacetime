import test from 'tape'
import spacetime from '../_lib/index.ts'

test('weekday numeric strings agree with numeric inputs', t => {
  const original = spacetime('2024-06-12T13:24:35.678', 'America/New_York')
  for (const day of [-8, -1, 0, 1, 2, 3, 4, 5, 6, 7, 22]) {
    for (const direction of [undefined, true, false]) {
      t.equal(original.day(String(day), direction).epoch, original.day(day, direction).epoch, `${day}, ${direction}`)
    }
  }
  t.equal(original.day(' MONDAY ').day(), 1, 'weekday names tolerate surrounding whitespace and case')
  t.end()
})

test('invalid weekday names do not move to the previous Saturday', t => {
  const original = spacetime('2024-06-12T13:24:35.678', 'UTC')
  for (const input of ['', ' ', 'nonsense', NaN, Infinity, -Infinity, 2.5]) {
    const result = original.day(input)
    t.equal(result.epoch, original.epoch, `ignores invalid input ${input}`)
    t.notEqual(result, original, 'returns a clone')
  }
  t.end()
})
