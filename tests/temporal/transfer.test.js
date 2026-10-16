import test from 'tape'
import spacetime from '../../src/temporal/index.js'

const T = globalThis.Temporal
const cases = [
  '2024-02-29T12:34:56.12+05:45[Asia/Kathmandu]',
  '2024-11-03T01:30:00.123456789-04:00[America/New_York]',
  '1969-12-31T23:59:59.999999999+00:00[UTC]'
]

test('Temporal transfer preserves instant, zone, and full serialization', { skip: !T }, t => {
  cases.forEach(value => {
    const original = T.ZonedDateTime.from(value)
    const s = spacetime(original)
    t.equal(s.toTemporal()?.epochNanoseconds, original.epochNanoseconds, value + ' instant')
    t.equal(s.toTemporal()?.timeZoneId, original.timeZoneId, value + ' zone')
    t.equal(s.format('iso-full'), original.toString(), value + ' formatting')
    t.equal(s.isoFull(), original.toString(), value + ' alias')
    t.equal(s.format('{iso-full}'), original.toString(), value + ' template')
    t.equal(spacetime(s.format('iso-full')).toTemporal()?.epochNanoseconds, original.epochNanoseconds, value + ' string round trip')
    t.equal(s.clone().toTemporal()?.epochNanoseconds, original.epochNanoseconds, value + ' clone')
    const moved = spacetime(original, 'Asia/Tokyo')
    t.equal(moved.toTemporal()?.epochNanoseconds, original.epochNanoseconds, value + ' explicit timezone instant')
    t.equal(moved.toTemporal()?.timeZoneId, 'Asia/Tokyo', value + ' explicit timezone')
  })
  t.end()
})

test('Temporal instant comparisons retain sub-millisecond differences', { skip: !T }, t => {
  const first = T.Instant.fromEpochNanoseconds(-2n).toZonedDateTimeISO('UTC')
  const last = first.add({ nanoseconds: 1 })
  const s = spacetime(first)
  t.equal(s.isBefore(last), true, 'one nanosecond earlier')
  t.equal(spacetime(last).isAfter(first), true, 'one nanosecond later')
  t.equal(s.isEqual(last), false, 'different instants within the same millisecond')
  t.equal(s.isSame(last, 'millisecond'), true, 'explicit millisecond comparison remains coarse')
  t.equal(s.isEqual(first.withTimeZone('Asia/Tokyo')), true, 'instant equality ignores zone')
  t.end()
})
