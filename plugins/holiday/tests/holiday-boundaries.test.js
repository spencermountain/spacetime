import test from 'tape'
import holiday from '../src/index.js'

test('Christmas is resolved in the requested year', t => {
  for (const year of [2024, 2026, 2027]) {
    const s = holiday('christmas', year)
    t.ok(s && s.isValid(), `Christmas ${year} is valid`)
    t.equal(s.year(), year, 'uses the requested year')
    t.equal(s.month(), 11, 'December')
    t.equal(s.date(), 25, 'December 25')
  }
  t.end()
})
