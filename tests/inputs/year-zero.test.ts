import test from 'tape'
import spacetime from '../_lib/index.ts'

test('explicit year zero is retained in every supported text date order', t => {
  const inputs = ['0000-feb-29', 'Feb 29 0000', 'feb-29-0000', '29 Feb 0000', '29-feb-0000', '02/29/0000']
  for (const input of inputs) {
    for (const today of [undefined, { year: 2025, month: 7, date: 15 }]) {
      const s = spacetime(input, 'UTC', { today })
      t.equal(s.isValid(), true, `${input}: valid leap day`)
      t.equal(s.iso(), '0000-02-29T00:00:00.000Z', `${input}: explicit zero overrides defaults`)
    }
  }
  t.equal(spacetime('February 0000', 'UTC').year(), 0, 'month and year')
  t.equal(spacetime('0000', 'UTC').year(), 0, 'year only')
  t.end()
})

test('year defaults can be zero without changing two-digit year handling', t => {
  t.equal(spacetime('Feb 29', 'UTC', { today: { year: 0 } }).iso(), '0000-02-29T00:00:00.000Z', 'zero default is a leap year')
  t.equal(spacetime('Feb 28', 'UTC', { today: { year: 2025 } }).year(), 2025, 'ordinary configured default')
  t.equal(spacetime('02/29/00', 'UTC').year(), 2000, 'two-digit zero means 2000')
  t.equal(spacetime('02/28/86', 'UTC').year(), 1986, 'two-digit cutoff is unchanged')
  t.end()
})
