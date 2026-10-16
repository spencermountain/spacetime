import test from 'tape'
import spacetime from '../_lib/index.js'
import aliases from '../../zonefile/aliases.js'

const dates = ['2026-01-15', '2026-07-15']

test('Intl timezone identifiers', (t) => {
  const zones = Intl.supportedValuesOf('timeZone')
  t.ok(zones.length > 0, 'runtime supplies timezone identifiers')
  zones.forEach((tz) => {
    const d = spacetime(0, tz)
    t.ok(d.isValid(), `${tz} is valid`)
    t.equal(d.epoch, 0, `${tz} preserves the supplied epoch`)
  })
  t.end()
})

test('unknown timezone identifiers are rejected', (t) => {
  t.throws(() => spacetime(0, 'flagbarg'), /Cannot find timezone/, 'unknown timezone produces a lookup error')
  t.end()
})

test('timezone aliases resolve to their declared targets', (t) => {
  // Intl enumeration omits legacy aliases; check the maintained alias table too.
  Object.entries(aliases).forEach(([alias, target]) => {
    dates.forEach(date => {
      const expected = spacetime(date, target)
      const actual = spacetime(date, alias)
      t.ok(actual.isValid(), `${alias} is valid on ${date}`)
      t.equal(actual.epoch, expected.epoch, `${alias} matches ${target} on ${date}`)
    })
  })
  t.end()
})

test('known aliases have independently specified offsets', (t) => {
  // Expected offsets in minutes, independent of the alias table.
  const cases = [
    ['utc', [0, 0]],
    ['Asia/Calcutta', [330, 330]],
    ['Asia/Katmandu', [345, 345]],
    ['US/Eastern', [-300, -240]],
    ['cet', [60, 120]]
  ]
  cases.forEach(([zone, offsets]) => {
    dates.forEach((date, i) => {
      t.equal(spacetime(date, zone).offset(), offsets[i], `${zone} offset on ${date}`)
    })
  })
  t.end()
})
