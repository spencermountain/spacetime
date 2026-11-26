import test from 'tape'
import spacetime from '../_lib/index.ts'

test('invalid quarter setters return an unchanged instance', t => {
  const original = spacetime('2024-06-15T12:30:00Z', 'UTC')
  for (const input of [0, 5, -1, 1.5, NaN, Infinity, -Infinity, '', 'q0', 'q5', 'unknown']) {
    const result = original.quarter(input)
    t.equal(typeof result, 'object', `${input}: returns an instance`)
    t.equal(result.epoch, original.epoch, `${input}: leaves the date unchanged`)
    t.notEqual(result, original, `${input}: returns a clone`)
  }
  t.equal(original.quarter(), 2, 'getter still returns the current quarter')
  t.equal(original.quarter('Q3').format('iso'), '2024-07-01T00:00:00.000Z', 'valid string setter')
  t.equal(original.quarter(1).format('iso'), '2024-01-01T00:00:00.000Z', 'valid numeric setter')
  t.equal(original.format('iso'), '2024-06-15T12:30:00.000Z', 'source remains unchanged')
  t.end()
})
