/* eslint-disable no-console */
import test from 'tape'
import legacy from '../_lib/index.ts'
import spacetime from '../../src/temporal/index.ts'

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
