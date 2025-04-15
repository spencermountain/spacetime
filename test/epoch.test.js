import test from 'tape'
import spacetime from './lib/index.js'

test('fromUnixSeconds', (t) => {
  let mils = 1744200453183
  let secs = 1744200453
  let a = spacetime.fromUnixSeconds(secs)
  let b = spacetime(mils)
  t.ok(a.isSame('hour', b), 'mils=secs')

  let s = spacetime.fromUnixSeconds(secs, 'Canada/Eastern')
  t.equal(s.iso(), '2025-04-09T08:07:33.000-04:00', '8am et');
  s = spacetime.fromUnixSeconds(secs, 'Canada/Pacific')
  t.equal(s.iso(), '2025-04-09T05:07:33.000-07:00', '5am pt');

  t.end()
})
