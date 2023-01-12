import test from 'tape'
import spacetime from '../../src/index.js'
import { getYear } from '../../src/compute/_lib/yearStart.js'
// import { misc, vancouver2023, karachi2011, adelaide2021, panama1980, jan1s } from './times/index.js'

let karachi2011 = [
  [1294065450665, "2011-01-03T19:37:30.665", "Asia/Karachi"],
  [1294081079529, "2011-01-03T23:57:59.529", "Asia/Karachi"],
  [1294164414256, "2011-01-04T23:06:54.256", "Asia/Karachi"],
]

test('karachi 2011 epoch-iso alignments', (t) => {
  karachi2011.forEach(a => {
    let [epoch, iso, tz] = a
    let out = spacetime(iso, tz).epoch
    t.equal(out, epoch, iso)
  })
  t.end()
})

// test('panama 1980 epoch-iso alignments', (t) => {
//   panama1980.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })

// test('vancouver epoch-iso alignments', (t) => {
//   vancouver2023.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })

// test('adelaide 2021 epoch-iso alignments', (t) => {
//   adelaide2021.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })

// test('random epoch-iso alignments', (t) => {
//   misc.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })