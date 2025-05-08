import test from 'tape'
import spacetime from './lib/index.js'

test('parse iso-full', (t) => {
  const full = '2011-12-03T10:15:30.010+01:00[Europe/Paris]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2011-12-03T10:15:30.010+01:00', 'same-iso')
  t.equal(s.format('iana'), 'Europe/Paris', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with different timezone', (t) => {
  const full = '2020-06-15T08:30:00.000-04:00[America/New_York]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2020-06-15T08:30:00.000-04:00', 'same-iso')
  t.equal(s.format('iana'), 'America/New_York', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with UTC timezone', (t) => {
  const full = '1999-12-31T23:59:59.000Z[UTC]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '1999-12-31T23:59:59.000Z', 'same-iso')
  t.equal(s.format('iana'), 'UTC', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with positive offset', (t) => {
  const full = '2023-01-01T12:00:00.000+05:30[Asia/Kolkata]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2023-01-01T12:00:00.000+05:30', 'same-iso')
  t.equal(s.format('iana'), 'Asia/Kolkata', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with negative offset', (t) => {
  const full = '2023-01-01T12:00:00.000-07:00[America/Denver]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2023-01-01T12:00:00.000-07:00', 'same-iso')
  t.equal(s.format('iana'), 'America/Denver', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.equal(full, s.isoFull(), 'isoFull():' + full)
  t.end()
})

test('calendar info', (t) => {
  const full = '2011-12-03T10:15:30+09:00[Asia/Tokyo][u-ca=japanese]'
  const s = spacetime(full)
  t.equal(s.format('iso-short'), '2011-12-03', 'still got iso')
  t.equal(s.timezone().name, 'Asia/Tokyo', 'still got tz')
  t.end()
})
