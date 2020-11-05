const test = require('tape')
const spacetime = require('./lib')
const useOldTz = require('./lib/useOldTz')

// 2am is skipped
test('spring-diff', (t) => {
  let before = spacetime('2020-03-08T01:00:00', 'America/Chicago')
  let after = spacetime('2020-03-08T03:00:00', 'America/Chicago')
  let delta = after.since(before).diff
  t.equal(delta.hours, 1, '1 hour later')

  before = spacetime('2020-03-08T01:59:00', 'America/Chicago')
  after = spacetime('2020-03-08T03:01:00', 'America/Chicago')
  delta = after.since(before).diff
  t.equal(delta.minutes, 2, '2 min later')

  t.end()
})

// there are two 1:00ams
test('fall-diff', (t) => {
  let before = spacetime('2020-11-01T01:50:00', 'America/Chicago')
  let after = spacetime('2020-11-01T03:10:00', 'America/Chicago')
  before = useOldTz(before)
  after = useOldTz(after)
  let delta = after.since(before).diff
  t.equal(delta.minutes, 20, '20 minutes later')
  t.end()
})
