import test from 'tape'
import spacetime from './_lib.js'
let here = '[misc-one] '

let init = Object.assign({}, spacetime.world.config)
const reset = () => spacetime.plugin({ config: init })

test('set default tz', (t) => {
  let config = { tryLocalTimezone: false, fallbackTz: 'Etc/GMT+9.5' }
  spacetime.plugin({ config })
  t.equal(spacetime.now().tz, 'Etc/GMT+9.5', here + 'set custom')
  reset()// reset config
  t.end()
})

test('throwUnknownTz', (t) => {
  t.throws(() => spacetime('3pm', 'foobar'), { type: 'UnknownTimezone' }, here + 'throws tz')

  spacetime.plugin({ config: { throwUnknownTz: false } })
  t.doesNotThrow(() => spacetime('3pm', 'foobar'), here + 'disable throw')
  reset()// reset config
  t.end()
})

test('throwUnparsedDate', (t) => {
  t.throws(() => spacetime('foo'), { type: 'InvalidDate' }, here + 'throws foo date')

  spacetime.plugin({ config: { throwUnparsedDate: false } })
  t.doesNotThrow(() => spacetime('foo'), here + 'disable date throw')

  let s = spacetime('foobar')
  t.equal(s.isSame('hour'), s.now(), 'now fallback')
  reset()// reset config
  t.end()
})


test('new tz', (t) => {
  spacetime.world.zones['Foo/Bar'] = { offset: 2 }
  let s = spacetime('12:24:23:748', 'Foo/Bar')
  t.equal(s.offset(), 2, here + 'new tz offset')
  delete spacetime.world.zones['Foo/Bar']// reset config
  t.end()
})