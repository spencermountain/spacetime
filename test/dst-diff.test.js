const test = require('tape')
const spacetime = require('./lib')
const useOldTz = require('./lib/useOldTz')

test('fall-diff', (t) => {
  let before = spacetime('2020-11-01T00:01:50', 'America/Chicago')
  let after = spacetime('2020-11-01T00:03:10', 'America/Chicago')
  before = useOldTz(before)
  after = useOldTz(after)
  let delta = after.since(before).diff
  t.equal(delta.minutes, 20, '20-mins later')
  t.end()
})

test('spring-diff', (t) => {
  let before = spacetime('2020-03-08T00:01:50', 'America/Chicago')
  let after = spacetime('2020-03-08T00:03:10', 'America/Chicago')
  before = useOldTz(before)
  after = useOldTz(after)
  let delta = after.since(before).diff
  t.equal(delta.minutes, 20, '20-mins later')
  t.end()
})
