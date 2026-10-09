/* eslint-disable no-console */
import test from 'tape'
import source from '../../src/temporal/index.js'
import built from '../../builds/spacetime-temporal.mjs'
import legacySource from '../../src/index.js'
import legacyBuilt from '../../builds/spacetime.mjs'

const spacetime = process.env.TESTENV === 'temporal-prod' ? built : source
const legacy = /prod/.test(process.env.TESTENV || '') ? legacyBuilt : legacySource
const T = globalThis.Temporal
const cases = [
  '2024-01-01T00:00:00+00:00[UTC]',
  '2024-02-29T12:34:56.12+05:45[Asia/Kathmandu]',
  '2024-11-03T01:30:00.123456789-04:00[America/New_York]',
  '2024-11-03T01:30:00.000000001-05:00[America/New_York]',
  '1969-12-31T23:59:59.999999999+00:00[UTC]',
  '2024-04-07T01:45:00+10:30[Australia/Lord_Howe]',
  '1900-01-01T12:00:00+00:09:21[Europe/Paris]',
  '2024-01-01T00:00:00-03:30[-03:30]',
  '+010000-01-01T00:00:00+00:00[UTC]',
  '0000-01-01T00:00:00+00:00[UTC]'
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

test('Regular Spacetime transfer retains milliseconds and reports losses on request', { skip: !T }, t => {
  cases.forEach(value => {
    const original = T.ZonedDateTime.from(value)
    const s = legacy(original)
    t.equal(s.toTemporal()?.epochMilliseconds, original.epochMilliseconds, value + ' milliseconds')
    t.equal(s.format('iso-full'), `${s.iso()}[${s.timezone().name}]`, value + ' regular serialization')
    t.equal(s.clone().toTemporal()?.epochMilliseconds, s.epoch, value + ' clone')
    t.equal(legacy(original, 'Asia/Tokyo').toTemporal()?.timeZoneId, 'Asia/Tokyo', value + ' explicit zone')
  })
  const warnings = []
  const warn = console.warn
  console.warn = message => warnings.push(message)
  try {
    const precise = T.Instant.fromEpochNanoseconds(-1n)
    const s = legacy(precise, 'UTC', { silent: false })
    t.equal(s.epoch, -1, 'negative fractional epochs floor instead of truncating toward zero')
    t.equal(warnings.length, 1, 'precision loss warning')
    t.match(warnings[0], /sub-millisecond/, 'actionable precision warning')
    legacy(precise, 'UTC')
    t.equal(warnings.length, 1, 'silent by default')
    legacy(T.PlainDate.from('2024-02-29').withCalendar('hebrew'), 'UTC', { silent: false })
    t.match(warnings[1], /calendar/, 'calendar warning')
    legacy(T.ZonedDateTime.from(cases[6]), undefined, { silent: false })
    t.match(warnings[2], /timezone rules/, 'historical timezone warning')
    t.equal(legacy(T.PlainTime.from('12:30'), 'UTC').isValid(), false, 'incomplete time rejected')
    t.equal(legacy(spacetime(0, 'UTC')).epoch, 0, 'native wrapper can transfer through its epoch getter')
  } finally {
    console.warn = warn
  }
  t.end()
})

test('Regular Spacetime formatting and string parsing stay independent of Temporal', t => {
  const previous = globalThis.Temporal
  const values = [
    '2024-01-01T00:00:00.000Z[UTC]',
    '2024-01-01T12:00:00.120+05:30[Asia/Kolkata]',
    '2024-11-03T01:30:00-05:00[America/New_York]'
  ]
  try {
    globalThis.Temporal = undefined
    const expected = values.map(value => {
      const s = legacy(value)
      return { epoch: s.epoch, full: s.isoFull() }
    })
    globalThis.Temporal = previous
    values.forEach((value, i) => {
      const s = legacy(value)
      s.toTemporal = () => { throw new Error('Unexpected Temporal conversion') }
      t.equal(s.epoch, expected[i].epoch, value + ' parsing unchanged')
      t.equal(s.isoFull(), expected[i].full, value + ' formatting unchanged')
      t.equal(s.format('{iso-full}'), expected[i].full, value + ' template unchanged')
    })
    t.equal(legacy(0, 'UTC').isoFull(), '1970-01-01T00:00:00.000Z[UTC]', 'original UTC syntax')
  } finally {
    globalThis.Temporal = previous
  }
  t.end()
})

test('Temporal plain inputs resolve DST once and preserve precision', { skip: !T }, t => {
  const zone = 'America/New_York'
  ;['2024-03-10T02:30:00.123456789', '2024-11-03T01:30:00.000000001'].forEach(value => {
    const plain = T.PlainDateTime.from(value)
    t.equal(spacetime(plain, zone).toTemporal()?.toString(), plain.toZonedDateTime(zone).toString(), value)
  })
  const date = T.PlainDate.from('2011-12-30')
  t.equal(spacetime(date, 'Pacific/Apia').toTemporal()?.toString(), date.toZonedDateTime('Pacific/Apia').toString(), 'skipped date')
  const instant = T.Instant.fromEpochNanoseconds(-1n)
  t.equal(spacetime(instant, 'UTC').toTemporal()?.epochNanoseconds, -1n, 'negative fractional millisecond')
  t.end()
})

test('Temporal calendar transfer follows the ISO-facing contract', { skip: !T }, t => {
  const original = T.ZonedDateTime.from('2024-02-29T12:34:56.123456789+00:00[UTC]').withCalendar('hebrew')
  const warnings = []
  const warn = console.warn
  console.warn = message => warnings.push(message)
  let values
  try {
    values = [original, original.toPlainDateTime(), original.toPlainDate()]
      .map(value => spacetime(value, 'UTC', { silent: false }))
  } finally {
    console.warn = warn
  }
  values.forEach(s => {
    t.equal(s.year(), 2024, 'Gregorian year')
    t.equal(s.month(), 1, 'zero-based Gregorian month')
    t.equal(s.date(), 29, 'Gregorian day')
    t.equal(s.toTemporal()?.calendarId, 'iso8601', 'calendar normalized')
  })
  t.equal(values[0].toTemporal()?.epochNanoseconds, original.epochNanoseconds, 'calendar conversion keeps the instant')
  t.equal(warnings.length, 3, 'each calendar conversion warns when requested')
  t.end()
})

test('Incomplete Temporal objects cannot silently become today', { skip: !T }, t => {
  ;[T.PlainTime.from('12:30'), T.PlainYearMonth.from('2024-02'), T.PlainMonthDay.from('02-29'), T.Duration.from('P1D')].forEach(value => {
    t.equal(spacetime(value, 'UTC').isValid(), false, value.toString())
  })
  t.end()
})
