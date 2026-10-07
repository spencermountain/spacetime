import test from 'tape'
import spacetime from '../_lib/index.js'

test('clone', (t) => {
  let a = spacetime('March 18, 1999 23:42:00', 'Canada/Eastern')
  let b = a.clone()
  t.equal(a.date(), 18, 'start-date')
  t.equal(a.hour(), 23, 'start hour')
  t.equal(a.isSame(b, 'hour'), true, 'same-hour')

  a = a.hour(7)
  t.equal(a.hour(), 7, 'new-hour')
  t.equal(b.hour(), 23, 'old-hour')

  b = b.date(17)
  t.equal(b.date(), 17, 'new-date')
  t.equal(a.date(), 18, 'old-date')

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
