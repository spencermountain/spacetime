import test from 'tape'
import spacetime from './lib/index.js'

test('jan 1 is week 1', (t) => {
  for (let i = 0; i < 125; i += 1) {
    let d = spacetime((1970 + i) + '/01/01');
    let iso = d.format('iso-short')
    t.equal(d.week(), 1, iso + ' week')
  }
  t.end()
})