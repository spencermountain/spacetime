import test from 'tape'
import spacetime from '../_lib/index.ts'

test('hourFloat applies direction to the complete clock time', (t) => {
  const cases = [
    ['2024-02-15T05:45:00', 6.5, true, '2024-02-15T06:30:00.000Z'],
    ['2024-02-15T05:15:00', 4.5, false, '2024-02-15T04:30:00.000Z'],
    ['2024-02-15T05:45:00', 5.5, true, '2024-02-16T05:30:00.000Z'],
    ['2024-02-15T00:15:00', 23.5, false, '2024-02-14T23:30:00.000Z']
  ] as const
  cases.forEach(([input, hour, direction, expected]) => {
    const original = spacetime(input, 'UTC')
    const epoch = original.epoch
    t.equal(original.hourFloat(hour, direction).iso(), expected, input)
    t.equal(original.epoch, epoch, 'receiver remains unchanged')
  })
  t.end()
})

test('quarter direction preserves the first day of the requested quarter', (t) => {
  const cases = [
    ['2024-02-15', 2, true, '2024-04-01'],
    ['2024-11-15', 4, true, '2025-10-01'],
    ['2024-03-15', 2, false, '2023-04-01'],
    ['2024-04-01T12:00:00', 2, true, '2025-04-01']
  ] as const
  cases.forEach(([input, quarter, direction, expected]) => {
    const result = spacetime(input, 'UTC').quarter(quarter, direction)
    t.equal(result.format('iso-short'), expected, input)
    t.equal(result.time(), '12:00am', 'quarter starts at midnight')
  })
  t.end()
})

test('season direction includes its day and time in both hemispheres', (t) => {
  const north = spacetime('2024-03-15', 'UTC')
  t.equal(north.season('spring', true).format('iso-short'), '2025-03-01', 'next northern spring')
  t.equal(north.season('spring', false).format('iso-short'), '2024-03-01', 'previous northern spring')
  const south = spacetime('2024-12-15', 'Australia/Sydney')
  t.equal(south.season('summer', true).format('iso-short'), '2025-12-01', 'next southern summer')
  t.equal(south.season('summer', false).format('iso-short'), '2024-12-01', 'previous southern summer')
  t.end()
})
