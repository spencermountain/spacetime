import spacetime from './newer/index.js'
import { getStart } from './newer/compute/_lib/yearStart.js'
import zones from './newer/zonefile/zonefile.2022.js'
// Object.keys(zones).forEach(k => {
//   if (zones[k].dst) {
//     zones[k].offset -= 1
//   }
// })
// console.log(JSON.stringify(zones, null, 2))

// import structure from './newer/changes/build.js'
// import byYear from './newer/changes/by-year.js'
// console.log(byYear('America/Toronto', 2022))


// let s = spacetime(1674455138750, "America/Vancouver")
// let cal = { year: 2023, month: 1, date: 22, hour: 22, minute: 25, second: 39 }
// console.log(s.hour())
// console.log(s.iso())

// console.log(getStart(2023, "Europe/Kirov"))
// console.log(getStart(2023, "Europe/London"))
// console.log(getStart(2023, "Europe/London"))
// console.log(getStart(2023, "America/Chicago"))

let tz = "America/Recife"
let n = getStart(2023, tz)
let s = spacetime(n, tz)
console.log(s.iso())