import test from 'tape'
import spacetime from './lib/index.js'

test('quarter inputs reject out-of-range values without throwing', (t) => {
  for (const quarter of [0, 5, 6, 7, 8, 9]) {
    for (const suffix of ['', ' 2020', ' of 2020']) {
      const input = 'q' + quarter + suffix
      t.doesNotThrow(() => {
        t.equal(spacetime(input, 'UTC').isValid(), false, input + ' is invalid')
      }, input + ' does not throw')
    }
  }
  for (const quarter of [1, 2, 3, 4]) {
    const s = spacetime('q' + quarter + ' of 2020', 'UTC')
    t.equal(s.month(), (quarter - 1) * 3, 'valid quarter ' + quarter)
    t.equal(s.year(), 2020, 'preserves year')
  }
  t.end()
})

test('January shorthand uses the zero-based month index', (t) => {
  for (const month of ['Jan', 'January', 'JAN']) {
    const s = spacetime("25 " + month + " '20", 'UTC')
    t.equal(s.iso(), '2020-01-25T00:00:00.000Z', month)
  }
  t.equal(spacetime("25 Jan '86", 'UTC').iso(), '1986-01-25T00:00:00.000Z', '1900s shorthand')
  t.equal(spacetime("25 Feb '20", 'UTC').iso(), '2020-02-25T00:00:00.000Z', 'February still works')
  t.equal(spacetime("25 Blah '20", 'UTC').isValid(), false, 'unknown month remains invalid')
  t.end()
})

test('day zero is invalid across date formats', (t) => {
  const inputs = [
    '2020-01-00', '2020-02-00', '2019-02-00', '2020-04-00',
    '2020-01-00T12:30:00Z', '01/00/2020', 'January 0 2020', "0 Jan '20"
  ]
  inputs.forEach((input) => {
    t.equal(spacetime(input, 'UTC').isValid(), false, input)
  })
  for (const input of ['2020-01-01', '2020-02-29', '2019-02-28', '2020-04-30']) {
    t.equal(spacetime(input, 'UTC').format('iso-short'), input, input + ' stays valid')
  }
  t.equal(spacetime('2019-02-29', 'UTC').isValid(), false, 'non-leap February 29 remains invalid')
  t.end()
})

test('ISO offsets preserve both minutes and the instant', (t) => {
  const cases = [
    ['+0100', 60], ['-0100', -60], ['+01:00', 60], ['-01:00', -60],
    ['+01', 60], ['-01', -60], ['+0530', 330], ['-0330', -210],
    ['+05:30', 330], ['-03:30', -210], ['+0545', 345], ['+05:45', 345],
    ['-0545', -345], ['-05:45', -345], ['+1245', 765], ['+12:45', 765],
    ['+0015', 15], ['-00:15', -15], ['+0030', 30], ['-00:30', -30],
    ['Z', 0], ['z', 0], ['+0000', 0], ['-00:00', 0]
  ]
  cases.forEach(([offset, minutes]) => {
    // A non-UTC default exposes offsets that are accidentally ignored.
    const s = spacetime('2020-01-01T12:00:00' + offset, 'America/New_York')
    t.equal(s.offset(), minutes, offset + ' offset in minutes')
    t.equal(s.epoch, Date.UTC(2020, 0, 1, 12) - minutes * 60000, offset + ' instant')
    t.equal(s.hour(), 12, offset + ' preserves local hour')
    t.equal(s.clone().epoch, s.epoch, offset + ' survives cloning')
  })
  t.end()
})
