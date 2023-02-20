import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'
import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'


let [year, tz, epoch] = [2023, "Europe/Berlin", 1672527600000]

let out = getStart(year, tz)
console.log((out - epoch) / HOUR, 'hours fast')
console.log(out === epoch)


let lux = DateTime.fromMillis(out).setZone(tz)
console.log(lux.toISO({}))
// lux = DateTime.fromMillis(epoch).setZone(tz)
// console.log(lux.toISO({}))


// let input = "2023-12-25T01:23:20.030-05:45"
// let s = spacetime(input, "America/Vancouver")
// console.log(s.format('iso-short'))