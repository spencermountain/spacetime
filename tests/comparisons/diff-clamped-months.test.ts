import test from 'tape'
import spacetime from '../_lib/index.ts'

// feb 29 plus two years is clamped to feb 28
// counting on from the 28th finds a month too many: feb 28 -> apr 28 fits before apr 29 17:14,
// but feb 29 23:10 plus 26 months is apr 29 23:10, which is past it
test('month diff does not carry a clamped leap-day', (t) => {
  const cases: [string, string, number][] = [
    ['2032-02-29T23:10:00', '2034-04-29T17:14:00', 25],
    ['2032-02-29T23:10:00', '2034-04-29T23:10:00', 26],
    ['2000-02-29T05:14:00', '2016-01-28T22:56:00', 190],
    ['2032-02-29T23:10:00', '2034-01-29T14:06:00', 22],
    ['2020-02-29T00:00:00', '2024-02-29T00:00:00', 48],
    ['2020-02-29T12:00:00', '2021-02-28T12:00:00', 12],
    ['2020-02-29T12:00:00', '2021-02-28T11:00:00', 11],
    ['2024-01-31T00:00:00', '2024-02-29T00:00:00', 1],
    ['2024-01-31T00:00:00', '2024-03-31T00:00:00', 2],
    ['2024-08-31T09:36:00', '2024-06-30T14:24:00', -2]
  ]
  cases.forEach(([from, to, months]) => {
    const a = spacetime(from, 'UTC')
    const b = spacetime(to, 'UTC')
    t.equal(a.diff(b, 'month'), months, `${from} -> ${to}`)
    t.equal(b.diff(a, 'month'), -months || 0, `${to} -> ${from}`)
    t.equal(a.diff(b).months, months, `${from} -> ${to} in the full diff`)
    t.equal(a.diff(b).quarters, Math.trunc(months / 3), `${from} -> ${to} quarters`)
    t.equal(a.diff(b).years, Math.trunc(months / 12), `${from} -> ${to} years`)
  })
  t.end()
})

// a diff is the most whole units that can be added to the earlier date without passing the later one
test('diff agrees with add', (t) => {
  let seed = 7
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  // (half of these land on the 28th-31st, where months get clamped)
  const date = () => {
    const day = random() < 0.5 ? 28 + Math.floor(random() * 4) : 1 + Math.floor(random() * 28)
    return Date.UTC(1996 + Math.floor(random() * 40), Math.floor(random() * 12), day, Math.floor(random() * 24), Math.floor(random() * 60))
  }
  const units = ['year', 'month', 'week', 'day'] as const
  const bad: string[] = []
  for (let i = 0; i < 250; i += 1) {
    const a = spacetime(date(), 'UTC')
    const b = spacetime(date(), 'UTC')
    const [early, late] = a.epoch <= b.epoch ? [a, b] : [b, a]
    const all = a.diff(b)
    const reversed = b.diff(a)
    units.forEach((unit) => {
      const count = Math.abs(all[`${unit}s`])
      const fits = early.add(count, unit).epoch <= late.epoch && early.add(count + 1, unit).epoch > late.epoch
      const signed = a.epoch <= b.epoch ? all[`${unit}s`] >= 0 : all[`${unit}s`] <= 0
      const mirrored = (reversed[`${unit}s`] || 0) === (-all[`${unit}s`] || 0)
      if (!fits || !signed || !mirrored) {
        bad.push(`${a.iso()} -> ${b.iso()} ${unit}: ${all[`${unit}s`]}`)
      }
    })
  }
  t.deepEqual(bad, [], 'every diff is the largest that fits')
  t.end()
})
