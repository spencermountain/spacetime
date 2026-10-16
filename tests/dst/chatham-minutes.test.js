import test from 'tape'
import spacetime from '../_lib/index.js'
import quickOffset from '../../src/timezone/quick.js'
import { normalizeZone } from '../../scripts/tz/lib.js'

const intervals = {
  initial: { offset: 13.75, dst: true },
  transitions: [
    { epoch: Date.parse('2026-04-04T14:00:00Z'), offset: 12.75, dst: false },
    { epoch: Date.parse('2026-09-26T14:00:00Z'), offset: 13.75, dst: true }
  ]
}

test('Chatham updater preserves minute boundaries', t => {
  const previous = { offset: 12.75, hem: 's', dst: '04/05:03->09/27:02' }
  const next = normalizeZone(intervals, previous, 'pacific/chatham', 2026)
  t.equal(next.dst, '04/05:03:45->09/27:02:45', 'correct local transition minutes')
  t.deepEqual(normalizeZone(intervals, next, 'pacific/chatham', 2026), next, 'stable on subsequent updates')
  const seconds = {
    ...intervals,
    transitions: intervals.transitions.map(change => ({ ...change, epoch: change.epoch + 1000 }))
  }
  t.throws(() => normalizeZone(seconds, previous, 'pacific/chatham', 2026), /whole minutes/, 'seconds remain unsupported')
  t.end()
})

test('Chatham and its alias switch at the exact minute', t => {
  const cases = [
    ['2026-04-04T13:59:59Z', 13.75],
    ['2026-04-04T14:00:00Z', 12.75],
    ['2026-09-26T13:59:59Z', 12.75],
    ['2026-09-26T14:00:00Z', 13.75]
  ]
  ;['Pacific/Chatham', 'NZ-CHAT'].forEach(zone => {
    cases.forEach(([instant, offset]) => {
      const s = spacetime(Date.parse(instant), zone)
      t.equal(s.timezone().current.offset, offset, `${zone} metadata at ${instant}`)
      t.equal(quickOffset(s), offset, `${zone} fast offset at ${instant}`)
    })
  })
  t.end()
})
