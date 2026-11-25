import test from 'tape'
import timekeeper from 'timekeeper'
import spacetime from '../_lib/index.ts'

test('since accepts epoch zero as an explicit comparison date', t => {
  for (const epoch of [-1000, 0, 1000, 86400000]) {
    const s = spacetime(epoch, 'UTC')
    t.deepEqual(s.since(0), s.since(spacetime(0, 'UTC')), `${epoch}: numeric epoch matches an instance`)
    t.deepEqual(s.since(0), s.since(new Date(0)), `${epoch}: numeric epoch matches a Date`)
    t.equal(s.epoch, epoch, 'source is unchanged')
  }
  timekeeper.freeze(new Date(2500))
  try {
    const s = spacetime(1000, 'UTC')
    t.deepEqual(s.since(), s.since(spacetime(2500, 'UTC')), 'omitted comparison still uses now')
  } finally {
    timekeeper.reset()
  }
  t.end()
})
