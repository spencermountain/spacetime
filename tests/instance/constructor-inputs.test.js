import test from 'tape'
import spacetime from '../_lib/index.js'

test('constructor copies spacetime instances, including zero and invalid epochs', t => {
  const inputs = [0, -1, 1700000000123, 'not a date', NaN, new Date(NaN)]
  inputs.forEach(input => {
    const source = spacetime(input, 'Asia/Kathmandu')
    const epoch = source.epoch
    const zone = source.tz
    const copy = spacetime(source)
    const explicit = spacetime(source, 'UTC')
    const label = `copy ${String(input)}`
    t.notEqual(copy, source, `${label}: distinct instance`)
    t.equal(copy.isValid(), source.isValid(), `${label}: preserves validity`)
    t.equal(copy.tz, zone, `${label}: inherits timezone`)
    t.equal(explicit.tz, spacetime(0, 'UTC').tz, `${label}: explicit timezone wins`)
    if (source.isValid()) {
      t.equal(copy.epoch, epoch, `${label}: preserves epoch`)
      t.equal(explicit.epoch, epoch, `${label}: timezone override preserves instant`)
    } else {
      t.equal(copy.format('iso'), '', `${label}: no ISO representation`)
      t.equal(explicit.isValid(), false, `${label}: override stays invalid`)
    }
    t.ok(Object.is(source.epoch, epoch), `${label}: source epoch unchanged`)
    t.equal(source.tz, zone, `${label}: source timezone unchanged`)
  })
  t.end()
})

test('constructor input forms represent the same UTC instant', t => {
  const epoch = Date.UTC(2024, 1, 29, 12, 34, 56, 789)
  const inputs = [
    ['milliseconds', epoch],
    ['native Date', new Date(epoch)],
    ['array', [2024, 1, 29, 12, 34, 56, 789]],
    ['object', { year: 2024, month: 1, date: 29, hour: 12, minute: 34, second: 56, millisecond: 789 }],
    ['UTC ISO', '2024-02-29T12:34:56.789Z'],
    ['offset ISO', '2024-02-29T18:19:56.789+05:45']
  ]
  inputs.forEach(([label, input]) => {
    const before = JSON.stringify(input)
    const date = spacetime(input, 'UTC')
    t.equal(date.isValid(), true, `${label}: valid`)
    t.equal(date.epoch, epoch, `${label}: exact instant`)
    t.equal(JSON.stringify(input), before, `${label}: input unchanged`)
  })
  for (const boundary of [0, -1, 1]) {
    t.equal(spacetime(boundary, 'UTC').epoch, boundary, `numeric epoch ${boundary}`)
    t.equal(spacetime(new Date(boundary), 'UTC').epoch, boundary, `native Date epoch ${boundary}`)
  }
  t.end()
})

test('constructor keeps invalid explicit input invalid', t => {
  const inputs = [NaN, Infinity, -Infinity, new Date(NaN), 'not a date']
  inputs.forEach(input => {
    const date = spacetime(input, 'UTC')
    t.equal(date.isValid(), false, `${String(input)}: invalid`)
    t.equal(date.format('iso'), '', `${String(input)}: no ISO representation`)
  })
  t.end()
})

test('omitted, null, and empty input still mean now', t => {
  const before = Date.now()
  const dates = [spacetime(), spacetime(undefined, 'UTC'), spacetime(null, 'UTC'), spacetime('', 'UTC')]
  const after = Date.now()
  dates.forEach((date, index) => {
    t.equal(date.isValid(), true, `now input ${index}: valid`)
    t.ok(date.epoch >= before && date.epoch <= after, `now input ${index}: current instant`)
  })
  t.end()
})
