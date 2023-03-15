import test from 'tape'
import spacetime from './_lib.js'
let here = '[misc-one] '

test('set default tz', (t) => {
  let config = { tryLocalTimezone: false, fallbackTz: 'Etc/GMT+9.5' }
  spacetime.plugin({ config })
  t.equal(spacetime.now().tz, 'Etc/GMT+9.5', here + 'set custom')
  // reset it
  config = { tryLocalTimezone: true, fallbackTz: 'Etc/Utc' }
  spacetime.plugin({ config })
  t.end()
})

test('throw errors', (t) => {
  let config = { throwUnparsedDate: false, throwUnknownTz: false }
  spacetime.plugin({ config })
  t.doesNotThrow(() => spacetime('foo', 'foobar'), here + 'disable throw')

  // let s = spacetime('foo', 'foobar')

  t.end()
})