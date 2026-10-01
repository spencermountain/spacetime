import test from 'tape'
import spacetime from '../src/index.js'

test('hour12 distinguishes noon and midnight', t => {
  const s = spacetime('2026-01-15T09:30:45.123', 'UTC')
  const cases = [
    ['12am', '2026-01-15T00:30:45.123Z'],
    ['12pm', '2026-01-15T12:30:45.123Z'],
    ['1am', '2026-01-15T01:30:45.123Z'],
    ['1pm', '2026-01-15T13:30:45.123Z'],
    ['11am', '2026-01-15T11:30:45.123Z'],
    ['11pm', '2026-01-15T23:30:45.123Z']
  ]
  cases.forEach(([input, expected]) => {
    t.equal(s.hour12(input).iso(), expected, input + ' preserves smaller fields')
  })
  t.equal(s.hour12('12am', true).iso(), '2026-01-16T00:30:45.123Z', 'forward midnight')
  t.equal(s.hour12('12pm', false).iso(), '2026-01-14T12:30:45.123Z', 'backward noon')
  t.equal(s.iso(), '2026-01-15T09:30:45.123Z', 'original unchanged')
  t.end()
})

test('clones and setters preserve day-first parsing', t => {
  const s = spacetime('01/02/2026', 'UTC', { dmy: true })
  t.equal(s.format('iso-short'), '2026-02-01', 'original uses day-first parsing')
  const copies = [s.clone(), s.add(1, 'day'), s.goto('Europe/London')]
  copies.forEach(copy => {
    t.notEqual(copy, s, 'operation returns a new object')
    t.equal(copy.set('03/04/2026').format('iso-short'), '2026-04-03', 'copy keeps day-first parsing')
  })
  t.equal(s.set('03/04/2026').format('iso-short'), '2026-04-03', 'set keeps day-first parsing')
  t.equal(s.set('03/04/2026').set('05/06/2026').format('iso-short'), '2026-06-05', 'chained setters preserve the option')
  t.equal(s.format('iso-short'), '2026-02-01', 'original unchanged')
  const american = spacetime('01/02/2026', 'UTC', { dmy: false })
  t.equal(american.clone().set('03/04/2026').format('iso-short'), '2026-03-04', 'month-first parsing stays month-first')
  t.end()
})
