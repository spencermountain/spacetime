import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'
import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'

let spring = [
  [1286028600000, "2010-10-03T00:10:00.000", "Australia/Melbourne"],
  [1286029800000, "2010-10-03T00:30:00.000", "Australia/Melbourne"],
  [1286031000000, "2010-10-03T00:50:00.000", "Australia/Melbourne"],
  [1286032200000, "2010-10-03T01:10:00.000", "Australia/Melbourne"],
  [1286033400000, "2010-10-03T01:30:00.000", "Australia/Melbourne"],
  [1286034600000, "2010-10-03T01:50:00.000", "Australia/Melbourne"],
  // (skip 2am)
  [1286035800000, "2010-10-03T03:10:00.000", "Australia/Melbourne"],
  [1286037000000, "2010-10-03T03:30:00.000", "Australia/Melbourne"],
  [1286038200000, "2010-10-03T03:50:00.000", "Australia/Melbourne"],
  [1286039400000, "2010-10-03T04:10:00.000", "Australia/Melbourne"]
]

spring.forEach((a, i) => {
  if (i === 6) {
    console.log('** ->')
  }
  let [epoch, iso, tz] = a

  let s = spacetime(epoch, tz)

  let lux = DateTime.fromMillis(epoch).setZone(tz)
  console.log(s.time(), lux.toISO({}))
})

let start = 1270306800000
let end = 1286031600000
let lux = DateTime.fromMillis(start).setZone('Australia/Melbourne')
console.log(lux.toISO({}))
// let want = 1640995200000 - (8 * HOUR)
// console.log((8 * HOUR))
// console.log(want)
// console.log(out)
// lux = DateTime.fromMillis(out).setZone(tz)


// let input = "2023-12-25T01:23:20.030-05:45"
// let s = spacetime(input, "America/Vancouver")
// console.log(s.format('iso-short'))