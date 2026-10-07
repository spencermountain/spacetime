import test from 'tape'
import spacetime from '../_lib/index.js'

test('fromUnixSeconds', (t) => {
  const mils = 1744200453183
  const secs = 1744200453
  const a = spacetime.fromUnixSeconds(secs)
  const b = spacetime(mils)
  t.equal(a.epoch, 1744200453000, 'fromUnixSeconds(1744200453) converts to milliseconds')
  t.equal(b.epoch - a.epoch, 183, 'millisecond input retains the fractional second')

  let s = spacetime.fromUnixSeconds(secs, 'Canada/Eastern')
  t.equal(s.iso(), '2025-04-09T08:07:33.000-04:00', '8am et');
  s = spacetime.fromUnixSeconds(secs, 'Canada/Pacific')
  t.equal(s.iso(), '2025-04-09T05:07:33.000-07:00', '5am pt');

  // test getter method
  t.equal(s.epochSeconds(), secs, 'retrieve seconds')

  // test setter method
  const futureSeconds = 1830720600
  s = spacetime.now('UTC').epochSeconds(futureSeconds)
  t.equal(s.epochSeconds(), futureSeconds, 'set seconds')
  t.equal(s.iso(), '2028-01-05T21:30:00.000Z', 'is future seconds')
  t.end()
})
