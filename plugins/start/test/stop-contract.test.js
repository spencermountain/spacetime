import test from 'tape'
import spacetime from 'spacetime'
import plugin from '../src/index.js'

spacetime.extend(plugin)

test('stopping playback twice is safe and preserves the datetime', t => {
  const s = spacetime('2026-06-21T14:35:42.123', 'UTC')
  const iso = s.iso()
  s.stop()
  s.stop()
  t.equal(s.iso(), iso, 'stopping an idle instance does not change its time')
  s.start()
  s.stop()
  s.stop()
  const stopped = s.epoch
  setTimeout(() => {
    t.equal(s.epoch, stopped, 'a stopped clock stays stopped beyond its next tick')
    t.end()
  }, 1200)
  t.teardown(() => s.stop())
})
