import test from 'tape'
import spacetime from '../_lib/index.ts'

test('parse iso-full', (t) => {
  // (iso-full leaves off trailing zeros in the milliseconds, like Temporal does)
  const full = '2011-12-03T10:15:30.01+01:00[Europe/Paris]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2011-12-03T10:15:30.010+01:00', 'same-iso')
  t.equal(s.format('iana'), 'Europe/Paris', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with different timezone', (t) => {
  const full = '2020-06-15T08:30:00-04:00[America/New_York]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2020-06-15T08:30:00.000-04:00', 'same-iso')
  t.equal(s.format('iana'), 'America/New_York', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with UTC timezone', (t) => {
  const full = '1999-12-31T23:59:59Z[UTC]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '1999-12-31T23:59:59.000Z', 'same-iso')
  t.equal(s.format('iana'), 'UTC', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with positive offset', (t) => {
  const full = '2023-01-01T12:00:00+05:30[Asia/Kolkata]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2023-01-01T12:00:00.000+05:30', 'same-iso')
  t.equal(s.format('iana'), 'Asia/Kolkata', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.end()
})

test('parse iso-full with negative offset', (t) => {
  const full = '2023-01-01T12:00:00-07:00[America/Denver]'
  const s = spacetime(full)
  t.equal(s.format('iso'), '2023-01-01T12:00:00.000-07:00', 'same-iso')
  t.equal(s.format('iana'), 'America/Denver', 'got-tz')
  t.equal(full, s.format('iso-full'), 'full-iso:' + full)
  t.equal(full, s.isoFull(), 'isoFull():' + full)
  t.end()
})

test('iso-full milliseconds', (t) => {
  const arr = [
    ['2023-01-01T12:00:00.000-07:00[America/Denver]', '2023-01-01T12:00:00-07:00[America/Denver]'],
    ['2023-01-01T12:00:00.100-07:00[America/Denver]', '2023-01-01T12:00:00.1-07:00[America/Denver]'],
    ['2023-01-01T12:00:00.120-07:00[America/Denver]', '2023-01-01T12:00:00.12-07:00[America/Denver]'],
    ['2023-01-01T12:00:00.123-07:00[America/Denver]', '2023-01-01T12:00:00.123-07:00[America/Denver]'],
    ['2023-01-01T12:00:00.050Z[UTC]', '2023-01-01T12:00:00.05Z[UTC]'],
    ['2023-01-01T12:00:00.001Z[UTC]', '2023-01-01T12:00:00.001Z[UTC]'],
    ['2023-01-01T12:10:00.000Z[UTC]', '2023-01-01T12:10:00Z[UTC]']
  ]
  arr.forEach(([input, want]) => {
    const s = spacetime(input)
    t.equal(s.isoFull(), want, input)
    t.equal(spacetime(want).epoch, s.epoch, want + ' parses back')
  })
  // the plain iso format always has three digits
  t.equal(spacetime(arr[0][0]).iso(), '2023-01-01T12:00:00.000-07:00', 'iso')
  t.end()
})

test('calendar info', (t) => {
  const full = '2011-12-03T10:15:30+09:00[Asia/Tokyo][u-ca=japanese]'
  const s = spacetime(full)
  t.equal(s.format('iso-short'), '2011-12-03', 'still got iso')
  t.equal(s.timezone().name, 'Asia/Tokyo', 'still got tz')
  t.end()
})
