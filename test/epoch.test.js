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

  // test getter method
  t.equal(s.epochSeconds(), secs, 'retrieve seconds')

  // test setter method
  let futureSeconds = 1830720600
  s = spacetime.now('UTC').epochSeconds(futureSeconds)
  t.equal(s.epochSeconds(), futureSeconds, 'set seconds')
  t.equal(s.iso(), '2028-01-05T21:30:00.000Z', 'is future seconds')
  t.end()
})
