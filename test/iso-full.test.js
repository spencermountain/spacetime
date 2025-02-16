import test from 'tape'
import spacetime from './lib/index.js'

test('parse iso-full', (t) => {
  let s = spacetime('2011-12-03T10:15:30+01:00[Europe/Paris]')
  t.equal(s.format('iso'), '2011-12-03T10:15:30.000+01:00', 'same-iso')
  t.equal(s.format('iana'), 'Europe/Paris', 'got-tz')
  t.end()
})

// test('format iso-full', (t) => {
//   let s = spacetime('2011-12-03T10:15:30', 'Europe/Paris')
//   t.equal(s.format('iso-full'), '2011-12-03T10:15:30+01:00[Europe/Paris]')
//   t.end()
// })
