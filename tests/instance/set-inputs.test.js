import test from 'tape'
import spacetime from '../_lib/index.js'

test('set accepts constructor inputs without changing the receiver or input', t => {
  const source = spacetime('2024-06-15T12:34:56.789', 'UTC')
  const original = source.iso()
  const inputs = [
    0, -1, 1700000000123, new Date(0), new Date(1700000000123),
    '2024-02-29T12:34:56.789Z', [2024, 1, 29, 12, 34, 56, 789],
    { year: 2024, month: 1, date: 29, hour: 12, minute: 34, second: 56, millisecond: 789 },
    NaN, new Date(NaN), 'not a date',
    spacetime(0, 'Asia/Kathmandu'), spacetime(-1, 'Asia/Kathmandu'),
    spacetime('not a date', 'Asia/Kathmandu')
  ]
  inputs.forEach((input, index) => {
    const snapshot = JSON.stringify(input)
    const actual = source.set(input, 'UTC')
    const expected = spacetime(input, 'UTC')
    const label = `input ${index}`
    t.notEqual(actual, source, `${label}: distinct result`)
    t.equal(actual.isValid(), expected.isValid(), `${label}: constructor validity`)
    t.equal(actual.format('iso'), expected.format('iso'), `${label}: constructor instant and zone`)
    t.equal(source.iso(), original, `${label}: receiver unchanged`)
    t.equal(JSON.stringify(input), snapshot, `${label}: input unchanged`)
  })
  const zoned = spacetime(0, 'Asia/Kathmandu')
  t.equal(source.set(zoned).tz, zoned.tz, 'instance input inherits its timezone')
  t.equal(source.set(zoned).epoch, 0, 'instance input preserves epoch zero')
  t.equal(source.set(zoned, 'America/New_York').epoch, 0, 'timezone override keeps the instant')
  t.equal(source.set(zoned, 'America/New_York').tz, 'america/new_york', 'timezone override wins')
  t.end()
})
