import test from 'tape'
import spacetime from '../_lib/index.js'
import firefoxTimezones from '../fixtures/firefox-timezones.js'
const here = '[Intl] '

test('intl-node ', (t) => {
  let arr = []
  // only supported >=node 18
  if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
    arr = Intl.supportedValuesOf('timeZone')
  }
  arr.forEach((tz) => {
    const d = spacetime.now(tz)
    t.ok(d.isValid(), here + tz)
  })

  t.throws(() => spacetime.now('flagbarg'), 'foo tz throws')
  t.doesNotThrow(() => spacetime.now('cet'), 'cet tz does not')
  t.end()
})

test('intl-firefox', (t) => {
  firefoxTimezones.forEach((tz) => {
    const d = spacetime.now(tz)
    t.ok(d.isValid(), here + tz)
  })
  t.end()
})
