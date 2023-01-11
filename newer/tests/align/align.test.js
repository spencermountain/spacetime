import test from 'tape'
import { getYear } from '../../src/compute/_lib/yearStart.js'
import misc from './times/misc.js'
import vancouver2023 from './times/vancouver-2021.js'
import adelaide2021 from './times/adelaide-2023.js'
import jan1s from './times/jan-1s.js'
import spacetime from '../../src/index.js'

test('vancouver epoch-iso alignments', (t) => {
  vancouver2023.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, iso)
  })
  t.end()
})

// test('random epoch-iso alignments', (t) => {
//   misc.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, iso)
//   })
//   t.end()
// })