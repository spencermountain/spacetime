import test from 'tape'
import spacetime from '../../src/index.js'
import { getYear } from '../../src/01-one/compute/_lib/yearStart.js'
import { misc, vancouver2023, karachi2011, adelaide2021, panama1980, jan1s } from './times/index.js'



test('karachi 2011 epoch-iso alignments', (t) => {
  karachi2011.forEach(a => {
    let [epoch, iso, tz] = a
    let s = spacetime(iso, tz)
    t.equal(s.epoch, epoch, '[iso→epoch] ' + iso)
    t.equal(s.fmt('iso-medium'), iso, '[iso→iso] ' + iso)
  })
  t.end()
})

test('panama 1980 epoch-iso alignments', (t) => {
  panama1980.forEach(a => {
    let [epoch, iso, tz] = a
    let s = spacetime(iso, tz)
    t.equal(s.epoch, epoch, '[iso→epoch] ' + iso)
    t.equal(s.fmt('iso-medium'), iso, '[iso→iso] ' + iso)
  })
  t.end()
})

// test('vancouver epoch-iso alignments', (t) => {
//   vancouver2023.forEach(a => {
//     let [epoch, iso, tz] = a
//     let s = spacetime(iso, tz)
//     // t.equal(s.epoch, epoch, '[iso→epoch] ' + iso)
//     t.equal(s.fmt('iso-medium'), iso, '[iso→iso] ' + iso)
//   })
//   t.end()
// })

// test('adelaide 2021 epoch-iso alignments', (t) => {
//   adelaide2021.forEach(a => {
//     let [epoch, iso, tz] = a
//     let s = spacetime(iso, tz)
//     t.equal(s.epoch, epoch, '[iso→epoch] ' + iso)
//     t.equal(s.fmt('iso-medium'), iso, '[iso→iso] ' + iso)
//   })
//   t.end()
// })

// test('random epoch-iso alignments', (t) => {
//   misc.forEach(a => {
//     let [epoch, iso, tz] = a
//     let s = spacetime(iso, tz)
//     t.equal(s.epoch, epoch, '[iso→epoch] ' + iso)
//     t.equal(s.fmt('iso-medium'), iso, '[iso→iso] ' + iso)
//   })
//   t.end()
// })