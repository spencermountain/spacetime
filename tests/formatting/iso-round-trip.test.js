import test from 'tape'
import spacetime from '../_lib/index.js'

test('ISO round trips preserve milliseconds, offsets, and the instant', t => {
  const cases = [
    ['1970-01-01T00:00:00.000Z', 0],
    ['1969-12-31T23:59:59.999Z', 0],
    ['2024-02-29T23:59:59.123+05:45', 345],
    ['2024-12-31T23:59:59.007+14:00', 840],
    ['2024-01-01T00:00:00.901-12:00', -720],
    ['2024-06-15T12:34:56.789-03:30', -210],
    ['2024-06-15T12:34:56.001+05:30', 330],
    ['2024-06-15T12:34:56.010+12:45', 765],
    ['2024-06-15T12:34:56.100-09:30', -570]
  ]
  cases.forEach(([input, offset]) => {
    const original = spacetime(input, 'UTC')
    const encoded = original.iso()
    // A different default timezone exposes a lost offset during parsing.
    const decoded = spacetime(encoded, 'America/Los_Angeles')
    const label = `${input}: ISO round trip`
    t.equal(decoded.epoch, Date.parse(input), `${label} preserves the instant`)
    t.equal(decoded.millisecond(), new Date(input).getUTCMilliseconds(), `${label} preserves milliseconds`)
    t.equal(decoded.offset(), offset, `${label} preserves offset minutes`)
    t.equal(decoded.iso(), encoded, `${label} serializes consistently`)
    t.equal(original.epoch, Date.parse(input), `${label} leaves the original unchanged`)
  })
  t.end()
})
