import test from 'tape'
import spacetime from './lib/index.js'

test('jan 1 is always first week', (t) => {
  for (let year = 1950; year < 2070; year += 1) {
    let s = spacetime(`${year}-01-01`);
    t.equal(year, s.year(), year + ' year')
    t.equal(s.week(), 1, year + ' week')
  }
  t.end()
})