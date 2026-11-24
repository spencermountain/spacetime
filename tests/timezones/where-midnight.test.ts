import test from 'tape'
import tk from 'timekeeper'
import spacetime from '../_lib/index.ts'

test('whereIts includes default windows spanning midnight', t => {
  t.teardown(() => tk.reset())
  tk.freeze(new Date('2026-01-15T19:45:00Z'))
  const zones = spacetime.whereIts('11:30pm')
  t.ok(zones.includes('Asia/Dubai'), '23:45 is inside the window')
  t.ok(zones.includes('Asia/Kabul'), '00:15 is inside the window')
  t.notOk(zones.includes('Asia/Karachi'), '00:45 is outside the window')
  t.deepEqual(spacetime.whereIts('11:30pm', '12:30am'), [], 'explicit reversed windows stay unsupported')
  tk.freeze(new Date('2026-01-15T19:59:00Z'))
  t.ok(spacetime.whereIts('11:30pm').includes('Asia/Kabul'), 'default end at 00:29 is inclusive')
  tk.freeze(new Date('2026-01-15T20:00:00Z'))
  t.notOk(spacetime.whereIts('11:30pm').includes('Asia/Kabul'), 'default end is 00:29')
  t.end()
})

test('whereIts preserves ordinary daytime windows', t => {
  t.teardown(() => tk.reset())
  tk.freeze(new Date('2026-01-15T07:45:00Z'))
  const zones = spacetime.whereIts('12:30pm', '1:30pm')
  t.ok(zones.includes('Asia/Karachi'), '12:45 is inside')
  t.ok(zones.includes('Asia/Kathmandu'), '13:30 is included at the end')
  t.notOk(zones.includes('Asia/Dhaka'), '13:45 is outside')
  t.end()
})
