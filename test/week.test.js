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

test('week input=output', (t) => {
  for (let w = 1; w < 52; w += 1) {
    const date = spacetime.now().week(w);
    t.equal(date.week(), w, `week ${w}`)
  }

  let tz = 'africa/addis_ababa'
  for (let w = 1; w < 52; w += 1) {
    const date = spacetime.now(tz).week(w);
    t.equal(date.week(), w, `${tz} week ${w}`)
  }
  tz = 'america/chicago'
  for (let w = 1; w < 52; w += 1) {
    const date = spacetime.now(tz).week(w);
    t.equal(date.week(), w, `${tz} week ${w}`)
  }
  t.end()
})