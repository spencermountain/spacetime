import test from 'tape'
import { performance } from 'node:perf_hooks'
import spacetime from './lib/index.js'

test('ISO parser rejects long ambiguous time input without excessive backtracking', (t) => {
  // The former adjacent time/offset groups could split a run of colons in
  // quadratically many ways before the trailing '!' made the match fail.
  // Keep the payload small enough for a regression to finish in-process.
  // Check elapsed time after parsing; this does not interrupt the regexp.
  const input = '0111-01-01 1' + ':'.repeat(32000) + '!'
  const start = performance.now()
  const s = spacetime(input, 'UTC')
  const elapsed = performance.now() - start

  t.equal(s.isValid(), false, 'rejects the malformed date')
  t.ok(elapsed < 500, `parses within 500ms (took ${elapsed.toFixed(1)}ms)`)
  t.end()
})

test('ISO parser still accepts times and signed offsets', (t) => {
  const cases = [
    ['2015-03-25 12:00:00', '2015-03-25T12:00:00.000Z'],
    ['2015-03-25T12:00:00Z', '2015-03-25T12:00:00.000Z'],
    ['2015-03-25T12:00:00.123+05:30', '2015-03-25T06:30:00.123Z'],
    ['2015-03-25T12:00:00-0700', '2015-03-25T19:00:00.000Z']
  ]
  cases.forEach(([input, expected]) => {
    t.equal(spacetime(input, 'UTC').format('iso-utc'), expected, input)
  })
  t.end()
})
