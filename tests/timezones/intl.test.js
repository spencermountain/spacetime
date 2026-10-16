import test from 'tape'
import spacetime from '../_lib/index.js'
import aliases from '../../zonefile/aliases.js'
const here = '[Intl] '

test('Intl timezone identifiers', (t) => {
  const zones = Intl.supportedValuesOf('timeZone')
  t.ok(zones.length > 0, 'runtime supplies timezone identifiers')
  zones.forEach((tz) => {
    const d = spacetime(0, tz)
    t.ok(d.isValid(), here + tz)
  })

  t.throws(() => spacetime.now('flagbarg'), 'foo tz throws')
  t.doesNotThrow(() => spacetime.now('cet'), 'cet tz does not')
  t.end()
})

test('timezone aliases resolve to their declared targets', (t) => {
  // Intl enumeration omits legacy aliases; check the maintained alias table too.
  Object.entries(aliases).forEach(([alias, target]) => {
    ;['2026-01-15', '2026-07-15'].forEach(date => {
      const expected = spacetime(date, target)
      const actual = spacetime(date, alias)
      t.ok(actual.isValid(), `${alias} is valid on ${date}`)
      t.equal(actual.epoch, expected.epoch, `${alias} matches ${target} on ${date}`)
    })
  })
  t.end()
})
