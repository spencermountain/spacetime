// @ts-nocheck
import test from 'tape'
import spacetime from '../../src/temporal/index.ts'

const options = { skip: !globalThis.Temporal }

test('Temporal invalid inputs stay invalid', options, t => {
  const s = spacetime('2024-01-15T12:30:00', 'UTC')
  const invalid = [
    spacetime('not a date', 'UTC'),
    spacetime('2024-01-01', 'bad/zone'),
    s.hour(NaN)
  ]
  invalid.forEach(value => {
    t.notOk(value.isValid(), 'invalid input')
    t.equal(value.toTemporal(), null, 'no native result')
    t.notOk(value.add(1, 'day').isValid(), 'arithmetic preserves invalidity')
  })
  t.equal(s.iso(), '2024-01-15T12:30:00.000Z', 'receiver is unchanged')
  t.end()
})

test('Temporal errors: missing runtime remains actionable', options, t => {
  const native = globalThis.Temporal
  try {
    globalThis.Temporal = undefined
    t.throws(() => spacetime('2024-01-01', 'UTC'), /requires native Temporal/)
  } finally {
    globalThis.Temporal = native
  }
  t.end()
})
