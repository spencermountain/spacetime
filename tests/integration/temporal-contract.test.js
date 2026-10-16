import test from 'tape'
import source from '../../src/index.js'
import built from '../../builds/spacetime.mjs'

const spacetime = /prod/.test(process.env.TESTENV || '') ? built : source

test('toTemporal explicitly requires the Temporal runtime, even for invalid dates', t => {
  const valid = spacetime(0, 'UTC')
  const invalid = spacetime('not a date', 'UTC')
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'Temporal')
  try {
    delete globalThis.Temporal
    const expected = /toTemporal\(\) requires native Temporal/
    t.throws(() => valid.toTemporal(), expected, 'valid dates throw a descriptive error')
    t.throws(() => invalid.toTemporal(), expected, 'invalid dates also throw without Temporal')
    t.equal(spacetime(0, 'UTC').year(), 1970, 'ordinary usage does not require Temporal')
  } finally {
    if (descriptor) {
      Object.defineProperty(globalThis, 'Temporal', descriptor)
    }
  }
  t.end()
})

test('main Temporal conversion preserves the instance and supports round trips', { skip: !globalThis.Temporal }, t => {
  const native = Temporal.ZonedDateTime.from('2026-07-15T12:34:56.789+09:00[Asia/Tokyo]')
  const s = spacetime(native)
  const epoch = s.epoch
  const zone = s.tz
  const out = s.toTemporal()
  t.ok(out instanceof Temporal.ZonedDateTime, 'returns a native ZonedDateTime')
  t.equal(out.epochMilliseconds, native.epochMilliseconds, 'preserves milliseconds')
  t.equal(out.timeZoneId.toLowerCase(), 'asia/tokyo', 'preserves the timezone')
  out.add({ days: 1 })
  t.equal(s.epoch, epoch, 'native arithmetic does not mutate the original epoch')
  t.equal(s.tz, zone, 'conversion does not mutate the original timezone')
  t.equal(spacetime(out).epoch, epoch, 'converted value can be used as input')
  t.equal(spacetime('not a date', 'UTC').toTemporal(), null, 'invalid dates return null when Temporal exists')
  t.end()
})
