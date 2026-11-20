import test from 'tape'
import spacetime from '../_lib/index.ts'

const localTz = spacetime().timezone().name

test('consistent offset input handling', (t) => {
  let s
  s = spacetime('2024-01-01T16:20:00') // 4:20pm local
  t.equal(s.time(), '4:20pm', 'no-offset, no-iana')
  t.equal(s.timezone().name, localTz, 'local-tz')

  s = spacetime('2024-01-01T16:20:00', 'America/Los_Angeles') // 4:20pm LA-time +DST
  t.equal(s.time(), '4:20pm', 'no-offset, iana')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'no-offset, iana')

  s = spacetime('2024-01-01T16:20:00-08:00') // 4:20pm LA-time [fixed-8h]
  t.equal(s.time(), '4:20pm', 'offset, no-iana')
  t.equal(s.timezone().name, 'Etc/GMT+8', '[fixed-8h]')

  s = spacetime('2024-01-01T16:20:00-08:00', 'America/Los_Angeles') // 4:20pm LA-time +DST
  t.equal(s.time(), '4:20pm', 'offset, consistent-iana')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'offset, consistent-iana')

  s = spacetime('2024-01-01T16:20:00[America/Los_Angeles]') // 4:20pm LA-time +DST
  t.equal(s.time(), '4:20pm', 'no-offset, bracket-iana')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'no-offset, bracket-iana')

  s = spacetime('2024-01-01T16:20:00-08:00[America/Los_Angeles]') // 4:20pm LA-time +DST
  t.equal(s.time(), '4:20pm', 'offset, bracket-iana')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'offset, bracket-iana')

  t.end()
})

test('valid Z offsets', (t) => {
  let s
  // this is actually consistent (per ISO spec)
  s = spacetime('2024-01-01T16:20:00Z', 'America/Los_Angeles') // 8:20am LA-time +DST
  t.equal(s.time(), '8:20am', 'utc-with-param')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'utc-with-param')
  // (same for this)
  s = spacetime('2024-01-01T16:20:00Z[America/Los_Angeles]') // 8:20am LA-time +DST
  t.equal(s.time(), '8:20am', 'utc-with-bracket')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'utc-with-bracket')

  // (and for this)
  s = spacetime('2024-01-01T16:20:00', 'Z').goto('America/Los_Angeles') // 8:20am LA-time +DST
  t.equal(s.time(), '8:20am', 'utc-with-goto')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'utc-with-goto')

  t.end()
})

// test('inconsistent offset inputs', (t) => {
// s = spacetime('2024-01-01T16:20:00-02:00', 'America/Los_Angeles') // 4:20pm LA-time +DST
// t.equal(s.time(), '4:20pm', 'offset, inconsistent-param')
// t.equal(s.timezone().name, 'America/Los_Angeles', 'offset, inconsistent-param')
// t.end()
// })

test('two-step offset inputs', (t) => {
  let s
  // two-step
  s = spacetime('2024-01-01T16:20:00').goto('America/Los_Angeles') // ~1:20pm LA-time +DST
  // t.equal(s.time(), '4:20pm', 'no-offset, goto')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'no-offset, goto')

  // two-step with offset
  s = spacetime('2024-01-01T16:20:00-08:00').goto('America/Los_Angeles') // 4:20pm LA-time +DST
  t.equal(s.time(), '4:20pm', 'two-step with offset')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'two-step with offset')

  // two-step with bracket-iana
  s = spacetime('2024-01-01T16:20:00-08:00[America/Los_Angeles]').goto('America/Los_Angeles') // 4:20pm LA-time +DST
  t.equal(s.time(), '4:20pm', 'two-step with bracket-iana')
  t.equal(s.timezone().name, 'America/Los_Angeles', 'two-step with bracket-iana')
  t.end()
})

test('all are 4:20pm', (t) => {
  const arr = [
    ['2024-01-01T16:20:00'], // 4:20pm local
    ['2024-01-01T16:20:00', 'America/Los_Angeles'], // 4:20pm LA-time +DST
    ['2024-01-01T16:20:00-08:00'], // 4:20pm LA-time [fixed-8h]
    ['2024-01-01T16:20:00', 'America/Los_Angeles'], // 4:20pm LA-time +DST
    ['2024-01-01T16:20:00-08:00', 'America/Los_Angeles'], // 4:20pm LA-time +DST
    ['2024-01-01T16:20:00-08:00[America/Los_Angeles]'] // 4:20pm LA-time +DST
  ]
  arr.forEach((a) => {
    const [iso, iana] = a
    const s = spacetime(iso, iana)
    t.equal(s.time(), '4:20pm')
  })
  t.end()
})
