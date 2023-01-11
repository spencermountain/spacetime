import test from 'tape'
import spacetime from '../../src/index.js'
import { getYear } from '../../src/compute/_lib/yearStart.js'
import { misc, vancouver2023, karachi2011, adelaide2021, panama1980, jan1s } from './times/index.js'

let toronto = {
  spring: [
    // spring
    [1678600800000, "2023-03-12T01:00:00.000", "America/Toronto"],
    [1678602000000, "2023-03-12T01:20:00.000", "America/Toronto"],
    [1678603200000, "2023-03-12T01:40:00.000", "America/Toronto"],
    //(skip 2pm)
    [1678604400000, "2023-03-12T03:00:00.000", "America/Toronto"],
    [1678605600000, "2023-03-12T03:20:00.000", "America/Toronto"],
    [1678606800000, "2023-03-12T03:40:00.000", "America/Toronto"],
  ],
  fall: [
    [1699156800000, "2023-11-05T00:00:00.000", "America/Toronto"],
    [1699158000000, "2023-11-05T00:20:00.000", "America/Toronto"],
    [1699159200000, "2023-11-05T00:40:00.000", "America/Toronto"],
    [1699160400000, "2023-11-05T01:00:00.000", "America/Toronto"],
    [1699161600000, "2023-11-05T01:20:00.000", "America/Toronto"],
    [1699162800000, "2023-11-05T01:40:00.000", "America/Toronto"],
    // (repeat 1am)
    [1699164000000, "2023-11-05T01:00:00.000", "America/Toronto"],
    [1699165200000, "2023-11-05T01:20:00.000", "America/Toronto"],
    [1699166400000, "2023-11-05T01:40:00.000", "America/Toronto"],
    [1699167600000, "2023-11-05T02:00:00.000", "America/Toronto"],
    [1699168800000, "2023-11-05T02:20:00.000", "America/Toronto"],
    [1699170000000, "2023-11-05T02:40:00.000", "America/Toronto"],
    [1699171200000, "2023-11-05T03:00:00.000", "America/Toronto"],
    [1699172400000, "2023-11-05T03:20:00.000", "America/Toronto"],
    [1699173600000, "2023-11-05T03:40:00.000", "America/Toronto"]
  ]

}

test('toronto spring dst ', (t) => {
  toronto.spring.forEach(a => {
    let [epoch, iso, tz] = a
    let str = spacetime(epoch, tz).iso()
    t.equal(str, iso, `Toronto-spring-dst - ${iso}`)
  })
  t.end()
})

// test('toronto fall dst ', (t) => {
//   toronto.fall.forEach(a => {
//     let [epoch, iso, tz] = a
//     let str = spacetime(epoch, tz).iso()
//     t.equal(str, iso, `Toronto-fall-dst - ${iso}`)
//   })
//   t.end()
// })