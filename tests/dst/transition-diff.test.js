import test from 'tape'
import spacetime from '../_lib/index.js'
import useOldTz from '../_lib/use-old-tz.js'

// 2am is skipped
test('spring-diff', (t) => {
  useOldTz(spacetime(null, 'UTC'), t)
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
  useOldTz(spacetime(null, 'UTC'), t)
  const before = spacetime('2020-11-01T01:50:00-05:00').goto('America/Chicago')
  const after = spacetime('2020-11-01T01:10:00-06:00').goto('America/Chicago')
  const delta = after.since(before).diff
  t.equal(delta.hours, 0, 'less than an hour across the repeated hour')
  t.equal(delta.minutes, 20, '20 minutes later')
  t.equal(after.epoch - before.epoch, 20 * 60000, '20 elapsed minutes')
  t.end()
})
