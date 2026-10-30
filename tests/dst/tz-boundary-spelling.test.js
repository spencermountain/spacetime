import test from 'tape'
import { normalizeZone } from '../../scripts/tz/lib.js'

// A zone with no previous dst string, so spellings come from the generator, not preservation.
const fresh = (hem, offset, shift, transitions, year = 2026) => {
  const initial = { offset, dst: hem === 's' }
  const previous = { offset, hem }
  return normalizeZone({ initial, transitions }, previous, 'test/zone', year).dst
}

test('timezone build spells a midnight fall-back as the end of the previous day', t => {
  // Spring forward 23:00 local (-2 → -1); fall back at 00:00 local (-1 → -2), i.e. 01:00Z on Oct 25.
  const nuuk = fresh('n', -2, 1, [
    { epoch: Date.UTC(2026, 2, 29, 1), offset: -1, dst: true },
    { epoch: Date.UTC(2026, 9, 25, 1), offset: -2, dst: false }
  ])
  t.equal(nuuk, '03/28:23->10/24:24', 'fall-back at 00:00 becomes previous day :24')

  // Fall-back at midnight on the first of a month crosses the month boundary.
  const monthEdge = fresh('n', 0, 1, [
    { epoch: Date.UTC(2026, 2, 29, 1), offset: 1, dst: true },
    { epoch: Date.UTC(2026, 9, 31, 23), offset: 0, dst: false }
  ])
  t.equal(monthEdge, '03/29:01->10/31:24', 'November 1 00:00 is spelled 10/31:24')

  // Spring forward at midnight keeps the :00 spelling (Beirut style).
  const beirut = fresh('n', 2, 1, [
    { epoch: Date.UTC(2026, 2, 28, 22), offset: 3, dst: true },
    { epoch: Date.UTC(2026, 9, 24, 21), offset: 2, dst: false }
  ])
  t.equal(beirut, '03/29:00->10/24:24', 'spring-forward at 00:00 stays :00')

  // Southern hemisphere: the fall-back comes first in the calendar year.
  const south = fresh('s', 11, 1, [
    { epoch: Date.UTC(2026, 3, 4, 13), offset: 10, dst: false },
    { epoch: Date.UTC(2026, 9, 3, 16), offset: 11, dst: true }
  ])
  t.equal(south, '04/04:24->10/04:02', 'first boundary is the fall-back')

  // Non-midnight boundaries are untouched.
  const london = fresh('n', 0, 1, [
    { epoch: Date.UTC(2026, 2, 29, 1), offset: 1, dst: true },
    { epoch: Date.UTC(2026, 9, 25, 1), offset: 0, dst: false }
  ])
  t.equal(london, '03/29:01->10/25:02', 'ordinary boundaries unchanged')
  t.end()
})
