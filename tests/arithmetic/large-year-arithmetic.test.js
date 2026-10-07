import test from 'tape'
import spacetime from '../_lib/index.js'

test('decade and century arithmetic respects amount and direction', t => {
  const s = spacetime('2026-01-15T09:30:45.123', 'UTC')
  ;[['decade', 10], ['century', 100]].forEach(([unit, years]) => {
    ;[-2, -1, 0, 1, 2].forEach(amount => {
      const added = s.add(amount, unit)
      const subtracted = s.subtract(amount, unit)
      t.equal(added.iso(), `${2026 + amount * years}-01-15T09:30:45.123Z`, unit + ' add ' + amount)
      t.equal(subtracted.iso(), `${2026 - amount * years}-01-15T09:30:45.123Z`, unit + ' subtract ' + amount)
    })
  })
  t.equal(s.add(2, 'decades').year(), 2046, 'plural decades')
  t.equal(s.subtract(2, 'centuries').year(), 1826, 'plural centuries')
  t.equal(s.iso(), '2026-01-15T09:30:45.123Z', 'original unchanged')
  t.end()
})

test('decade and century arithmetic clamps leap days', t => {
  const s = spacetime('2000-02-29T09:30:00', 'UTC')
  const cases = [
    [1, 'decade', '2010-02-28T09:30:00.000Z'],
    [-1, 'decade', '1990-02-28T09:30:00.000Z'],
    [2, 'decade', '2020-02-29T09:30:00.000Z'],
    [1, 'century', '2100-02-28T09:30:00.000Z'],
    [-1, 'century', '1900-02-28T09:30:00.000Z'],
    [4, 'century', '2400-02-29T09:30:00.000Z']
  ]
  cases.forEach(([amount, unit, expected]) => {
    t.equal(s.add(amount, unit).iso(), expected, amount + ' ' + unit)
    t.equal(s.subtract(-amount, unit).iso(), expected, 'subtract opposite amount')
  })
  t.equal(s.iso(), '2000-02-29T09:30:00.000Z', 'original leap day unchanged')
  t.end()
})
