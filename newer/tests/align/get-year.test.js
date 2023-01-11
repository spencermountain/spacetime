import test from 'tape'
import { getYear } from '../../src/compute/_lib/yearStart.js'
import times from './_times.js'
import spacetime from '../../src/index.js'


test('get Year', (t) => {
  times.forEach(a => {
    let [epoch, iso, tz] = a
    // which year is the epoch in?
    let { year, start } = getYear(epoch, tz)
    let want = Number(iso.substring(0, 4))
    t.equal(year, want, `[year] ${iso}`)

    // is the epoch-start of the year correct?
    let str = spacetime(start, tz).format('{year}-{month-pad}-{date-pad}')
    t.equal(str, `${year}-01-01`, `[iso-start] ${iso}`)
  })
  t.end()
})

// test('random epoch-iso alignments', (t) => {
//   arr.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })