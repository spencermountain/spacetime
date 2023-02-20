import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'
import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'

let spring = [
  [1270305000000, "2010-04-04T01:30:00.000", "Australia/Melbourne"],
  [1270307400000, "2010-04-04T02:10:00.000", "Australia/Melbourne"],
  [1270308600000, "2010-04-04T02:30:00.000", "Australia/Melbourne"],
  [1270309800000, "2010-04-04T02:50:00.000", "Australia/Melbourne"],
  // repeat 2am
  [1270311000000, "2010-04-04T02:10:00.000", "Australia/Melbourne"],
  [1270312200000, "2010-04-04T02:30:00.000", "Australia/Melbourne"],
  [1270313400000, "2010-04-04T02:50:00.000", "Australia/Melbourne"],
  [1270314600000, "2010-04-04T03:10:00.000", "Australia/Melbourne"],
  [1270315800000, "2010-04-04T03:30:00.000", "Australia/Melbourne"],
  [1270317000000, "2010-04-04T03:50:00.000", "Australia/Melbourne"],
  [1270318200000, "2010-04-04T04:10:00.000", "Australia/Melbourne"],
]

spring.forEach((a, i) => {
  if (i === 4) {
    console.log('**')
  }
  let [epoch, iso, tz] = a

  let s = spacetime(epoch, tz)
  console.log(s.time())

  let lux = DateTime.fromMillis(epoch).setZone(tz)
  // console.log(lux.toISO({}))
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