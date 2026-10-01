import test from 'tape'
import spacetime from '../src/index.js'
import quickOffset from '../src/timezone/quick.js'

const check = (t, zone, instant, offset) => {
  const s = spacetime(Date.parse(instant), zone)
  t.equal(s.timezone().current.offset, offset, `${zone} offset at ${instant}`)
  t.equal(quickOffset(s), offset, `${zone} fast offset at ${instant}`)
}

test('Lord Howe and LHI share a half-hour DST shift', t => {
  ;['Australia/Lord_Howe', 'Australia/LHI'].forEach(zone => {
    check(t, zone, '2026-01-15T12:00:00Z', 11)
    check(t, zone, '2026-04-04T14:59:59Z', 11)
    check(t, zone, '2026-04-04T15:00:00Z', 10.5)
    check(t, zone, '2026-10-03T15:29:59Z', 10.5)
    check(t, zone, '2026-10-03T15:30:00Z', 11)
  })
  t.end()
})
