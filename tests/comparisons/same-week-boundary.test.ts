import test from 'tape'
import spacetime from '../_lib/index.ts'

test('isSame week compares the week containing each date', t => {
  const pairs: [string, string, boolean][] = [
    ['2024-12-30', '2025-01-01', true],
    ['2020-12-31', '2021-01-01', true],
    ['2024-01-01', '2024-12-30', false],
    ['2024-12-29', '2024-12-30', false],
    ['2025-01-05', '2025-01-06', false]
  ]
  pairs.forEach(([first, second, expected]) => {
    const a = spacetime(first, 'UTC')
    const b = spacetime(second, 'UTC')
    t.equal(a.isSame(b, 'week'), expected, `${first} and ${second}`)
    t.equal(b.isSame(a, 'weeks'), expected, 'symmetric, including plural units')
  })
  const sunday = spacetime('2024-12-29', 'UTC', { weekStart: 0 })
  const monday = spacetime('2024-12-30', 'UTC', { weekStart: 0 })
  t.equal(sunday.isSame(monday, 'week'), true, 'configured Sunday boundary')
  t.end()
})
