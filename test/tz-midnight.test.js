import test from 'tape'
import { normalizeZone } from '../scripts/tz/lib.js'
import inSummerTime from '../src/timezone/summerTime.js'

const normalize = (oldDst, start, end, year = 2026) => {
  const initial = { offset: 0, dst: false }
  const transitions = [
    { epoch: start, offset: 1, dst: true },
    { epoch: end - 3600000, offset: 0, dst: false }
  ]
  return normalizeZone({ initial, transitions }, { offset: 1, hem: 'n', dst: oldDst }, 'test/zone', year)
}

test('timezone build preserves equivalent 24:00 boundary spellings', t => {
  const cases = [
    ['03/28:24->10/24:24', Date.UTC(2026, 2, 29), Date.UTC(2026, 9, 25), 2026],
    ['03/31:24->10/31:24', Date.UTC(2026, 3, 1), Date.UTC(2026, 10, 1), 2026],
    ['02/28:24->10/24:24', Date.UTC(2026, 2, 1), Date.UTC(2026, 9, 25), 2026],
    ['02/29:24->10/24:24', Date.UTC(2028, 2, 1), Date.UTC(2028, 9, 25), 2028],
    ['12/31:24->10/24:24', Date.UTC(2026, 0, 1), Date.UTC(2026, 9, 25), 2026]
  ]
  for (const [dst, start, end, year] of cases) {
    const result = normalize(dst, start, end, year)
    if (dst.startsWith('12/31')) {
      t.equal(result.dst, '01/01:00->10/24:24', 'December 31 hour 24 belongs to next year, not this January')
    } else {
      t.equal(result.dst, dst, 'preserve ' + dst)
      const [a, b] = dst.split('->')
      t.notOk(inSummerTime(start - 1, a, b, 1, 0), 'before start')
      t.ok(inSummerTime(start, a, b, 1, 0), 'at start')
      t.ok(inSummerTime(end - 3600000 - 1, a, b, 1, 0), 'before end')
      t.notOk(inSummerTime(end - 3600000, a, b, 1, 0), 'at end')
    }
  }
  t.end()
})

test('timezone build retains real boundary changes', t => {
  const start = Date.UTC(2026, 2, 28, 23)
  const end = Date.UTC(2026, 9, 25)
  t.equal(normalize('03/29:00->10/24:24', start, end).dst, '03/28:23->10/24:24', 'one-hour change retained; equivalent end preserved')
  t.equal(normalize('03/28:00->10/25:00', Date.UTC(2026, 2, 29), end).dst, '03/29:00->10/25:00', 'same-day 00 and 24 are not interchangeable')
  t.equal(normalize('02/30:00->10/24:24', Date.UTC(2026, 2, 2), end).dst, '03/02:00->10/24:24', 'invalid calendar date not preserved by rollover')
  t.equal(normalize('02/28:24->10/24:24', Date.UTC(2028, 2, 1), Date.UTC(2028, 9, 25), 2028).dst, '03/01:00->10/24:24', 'leap-day difference is real')
  t.end()
})
