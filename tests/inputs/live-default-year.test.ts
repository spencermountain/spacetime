import test from 'tape'
import timekeeper from 'timekeeper'
import spacetime from '../_lib/index.ts'

test('object inputs without a year follow the current clock after import', (t) => {
  try {
    for (const year of [2031, 2032, 2040]) {
      timekeeper.freeze(new Date(`${year}-06-12T12:00:00Z`))
      t.equal(spacetime({ month: 2, date: 5 }, 'UTC').year(), year, `${year}: omitted year`)
      t.equal(spacetime({ year: 2001, month: 2, date: 5 }, 'UTC').year(), 2001, 'explicit year wins')
      t.equal(spacetime({ month: 2, date: 5 }, 'UTC', { today: { year: 1999 } }).year(), 1999, 'configured today wins')
    }
  } finally {
    timekeeper.reset()
  }
  t.end()
})
