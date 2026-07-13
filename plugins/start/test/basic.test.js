import test from 'tape'
import spacetime from '../../../src/index.js'
import startPlugin from '../src/index.js'

spacetime.extend(startPlugin)

// how much timer-slop we allow (ms) - generous, for slow CI machines
const tolerance = 50

test('advances at real-rate from an arbitrary date', (t) => {
  const s = spacetime('June 8th, 1998 11:00am', 'Canada/Eastern')
  const beginEpoch = s.epoch
  const beginWall = Date.now()
  s.start({ interval: 20 })
  setTimeout(() => {
    s.stop()
    const wallElapsed = Date.now() - beginWall
    const epochElapsed = s.epoch - beginEpoch
    t.equal(s.year(), 1998, 'still in 1998')
    t.ok(Math.abs(epochElapsed - wallElapsed) < tolerance, `advanced ~${wallElapsed}ms (got ${epochElapsed}ms)`)
    t.end()
  }, 150)
})

test('rate multiplies elapsed time', (t) => {
  const s = spacetime.now()
  const beginEpoch = s.epoch
  const beginWall = Date.now()
  s.start({ interval: 20, rate: 100 })
  setTimeout(() => {
    s.stop()
    const expected = (Date.now() - beginWall) * 100
    const epochElapsed = s.epoch - beginEpoch
    t.ok(Math.abs(epochElapsed - expected) < tolerance * 100, `advanced ~${expected}ms (got ${epochElapsed}ms)`)
    t.end()
  }, 150)
})

test('tick callback fires with the spacetime object', (t) => {
  const s = spacetime.now()
  let count = 0
  s.start({
    interval: 25,
    tick: (obj) => {
      count += 1
      t.equal(obj.epoch, s.epoch, 'callback gets the live object')
    }
  })
  setTimeout(() => {
    s.stop()
    t.ok(count >= 2, `tick fired ${count} times`)
    t.end()
  }, 120)
})

test('stop freezes the epoch', (t) => {
  const s = spacetime.now()
  s.start({ interval: 20 })
  setTimeout(() => {
    s.stop()
    const frozen = s.epoch
    setTimeout(() => {
      t.equal(s.epoch, frozen, 'epoch unchanged after stop')
      t.end()
    }, 80)
  }, 60)
})

test('epoch matches wall-clock, not tick-count', (t) => {
  // even if the event-loop is delayed, the epoch is derived from
  // the wall-clock anchor - so blocking cannot cause drift
  const s = spacetime.now()
  const beginEpoch = s.epoch
  const beginWall = Date.now()
  s.start({ interval: 10 })
  // block the event loop for a bit, starving the timer
  const until = Date.now() + 100
  while (Date.now() < until) {
    // spin
  }
  setTimeout(() => {
    s.stop()
    const wallElapsed = Date.now() - beginWall
    const epochElapsed = s.epoch - beginEpoch
    t.ok(Math.abs(epochElapsed - wallElapsed) < tolerance, `no drift after starvation (${epochElapsed}ms vs ${wallElapsed}ms)`)
    t.end()
  }, 50)
})

test('calling start twice re-anchors cleanly', (t) => {
  const s = spacetime.now()
  s.start({ interval: 20 })
  s.start({ interval: 20, rate: 0 })
  const frozen = s.epoch
  setTimeout(() => {
    t.equal(s.epoch, frozen, 'rate:0 holds still - old timer was cleared')
    s.stop()
    t.end()
  }, 80)
})

test('bad options fall back to defaults', (t) => {
  const s = spacetime.now()
  s.start({ interval: -5, rate: 'fast' })
  t.equal(s._ticker.rate, 1, 'rate defaulted to 1')
  s.stop()
  t.equal(s._ticker, null, 'ticker cleaned up')
  t.end()
})
