import test from 'tape'
import spacetime from '../_lib/index.ts'

test('isSame returns null for inherited property names used as units', t => {
  const start = spacetime('2024-06-15T12:30:00Z', 'UTC')
  const later = start.add(1, 'day')
  const units = ['constructor', 'toString', 'valueOf', 'hasOwnProperty', '__proto__', '__defineGetter__']
  units.forEach(unit => {
    t.doesNotThrow(() => {
      t.equal(start.isSame(later, unit), null, unit + ' is unsupported')
    }, unit + ' does not invoke an inherited method')
  })
  t.equal(start.isSame(later, 'day'), false, 'known units still distinguish dates')
  t.equal(start.isSame(later, 'months'), true, 'plural known units still work')
  t.equal(start.isSame(later, 'unknown'), null, 'other unknown units still return null')
  t.end()
})
