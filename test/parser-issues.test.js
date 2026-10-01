import test from 'tape'
import spacetime from '../src/index.js'

test('invalid clock fields do not become valid dates', t => {
  const inputs = [
    '2026-01-15T25:00:00',
    '2026-01-15T12:99:00',
    '2026-01-15T12:30:99',
    '2026-01-15T12:30:60Z',
    'January 15 2026 25:00',
    'January 15 2026 12:99',
    'January 15 2026 13pm',
    '01/15/2026 13:00:00 PM',
    '01/15/2026 00:30:00 AM'
  ]
  inputs.forEach(input => {
    const s = spacetime(input, 'UTC')
    t.equal(s.isValid(), false, input + ' is invalid')
  })
  t.equal(spacetime('2', 'UTC').isValid(), false, 'bare digit is invalid')
  const s = spacetime('2026-01-15T09:30:00', 'UTC')
  t.equal(s.time('2').isValid(), false, 'unrecognized time setter is invalid')
  t.equal(s.time(), '9:30am', 'invalid setter leaves original unchanged')
  t.end()
})

test('valid clock fields retain their values', t => {
  const cases = [
    ['2026-01-15T00:00:00', '2026-01-15T00:00:00.000Z'],
    ['2026-01-15T23:59:59.123', '2026-01-15T23:59:59.123Z'],
    ['01/15/2026 12:30:08 AM', '2026-01-15T00:30:08.000Z'],
    ['01/15/2026 12:30:08 PM', '2026-01-15T12:30:08.000Z'],
    ['January 15 2026 2pm', '2026-01-15T14:00:00.000Z'],
    ['2026-01-15', '2026-01-15T00:00:00.000Z']
  ]
  cases.forEach(([input, expected]) => {
    t.equal(spacetime(input, 'UTC').iso(), expected, input)
  })
  t.end()
})

test('numeric dates accept two-digit years with a clock', t => {
  const input = '12/30/19 12:22:08 PM'
  const s = spacetime(input, 'Pacific/Honolulu', { silent: false })
  t.equal(s.isValid(), true, 'reported input parses')
  t.equal(s.iso(), '2019-12-30T12:22:08.000-10:00', 'preserves local date and time')
  t.equal(s.format('iso-utc'), '2019-12-30T22:22:08.000Z', 'correct instant')
  t.equal(spacetime('12/30/19', 'UTC').iso(), '2019-12-30T00:00:00.000Z', 'date without clock')
  t.equal(spacetime('30/12/19 12:22:08 PM', 'UTC', { dmy: true }).iso(),
    '2019-12-30T12:22:08.000Z', 'day-first input')
  t.equal(spacetime('01/02/19', 'UTC', { dmy: true }).iso(),
    '2019-02-01T00:00:00.000Z', 'day-first option resolves ambiguous input')
  t.equal(spacetime('12/30/2019 12:22:08 PM', 'UTC').iso(),
    '2019-12-30T12:22:08.000Z', 'four-digit years still work')
  t.equal(spacetime('02/29/19', 'UTC').isValid(), false, 'invalid calendar date stays invalid')
  t.equal(spacetime('12/30/19 12:99:08 PM', 'UTC').isValid(), false, 'invalid clock stays invalid')
  t.end()
})
