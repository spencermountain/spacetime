import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'
import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'

// 1640966400000
let [year, tz, epoch] = [2022, "Asia/Shanghai", 1640973600000]

// let out = getStart(year, tz)
// console.log((out - epoch) / HOUR, 'hours fast')
// console.log(out === epoch)


// let lux = DateTime.fromMillis(out).setZone(tz)
// console.log(lux.toISO({}))


let lux = DateTime.fromMillis(1640995200000).setZone('UTC')
console.log(lux.toISO({}))
let want = 1640995200000 - (8 * HOUR)
console.log(want)
lux = DateTime.fromMillis(want).setZone(tz)
console.log(lux.toISO({}))


// let input = "2023-12-25T01:23:20.030-05:45"
// let s = spacetime(input, "America/Vancouver")
// console.log(s.format('iso-short'))