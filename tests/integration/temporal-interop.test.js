import test from 'tape'
import source from '../../src/index.js'
import built from 'spacetime'
const spacetime = ['prod', 'temporal-prod'].includes(process.env.TESTENV) ? built : source
const options = { skip: !globalThis.Temporal }

test('main library: native Temporal instant and zone interop', options, t => {
  const T = globalThis.Temporal
  const native = T.ZonedDateTime.from('2024-11-03T01:30:00-05:00[America/New_York]')
  const s = spacetime(native)
  t.equal(s.epoch, native.epochMilliseconds)
  t.equal(s.tz, 'america/new_york')
  t.equal(s.toTemporal().epochMilliseconds, native.epochMilliseconds)
  t.equal(s.toTemporal().timeZoneId.toLowerCase(), 'america/new_york')
  const utc = spacetime(native, 'UTC')
  t.equal(utc.epoch, native.epochMilliseconds)
  t.equal(utc.hour(), 6)
  t.equal(spacetime(native.toInstant(), 'UTC').epoch, native.epochMilliseconds)
  t.equal(spacetime(0, 'UTC').set(native).epoch, native.epochMilliseconds)
  t.equal(spacetime(T.Instant.fromEpochMilliseconds(0), 'UTC').epoch, 0)
  t.equal(spacetime('bad input', 'UTC').toTemporal(), null)
  t.end()
})

test('main library: Temporal wall-clock inputs and fixed offsets', options, t => {
  const T = globalThis.Temporal
  const date = T.PlainDate.from('2024-02-29')
  t.equal(spacetime(date, 'UTC').iso(), '2024-02-29T00:00:00.000Z')
  const datetime = T.PlainDateTime.from('2024-03-10T02:30:00')
  const zoned = datetime.toZonedDateTime('America/New_York')
  t.equal(spacetime(datetime, 'America/New_York').epoch, zoned.epochMilliseconds)
  const offset = spacetime(date, 'UTC+5:30')
  t.equal(offset.toTemporal().offset, '+05:30')
  t.equal(offset.toTemporal().epochMilliseconds, offset.epoch)
  const precise = T.Instant.from('2024-01-01T00:00:00.123456789Z')
  t.equal(spacetime(precise, 'UTC').epoch, precise.epochMilliseconds, 'millisecond precision')
  t.end()
})

test('main library still works without Temporal', t => {
  const native = globalThis.Temporal
  try {
    globalThis.Temporal = undefined
    const s = spacetime('2024-02-29', 'UTC')
    t.equal(s.add(1, 'year').format('iso-short'), '2025-02-28')
    t.throws(() => s.toTemporal(), /requires native Temporal/)
  } finally {
    globalThis.Temporal = native
  }
  t.end()
})
