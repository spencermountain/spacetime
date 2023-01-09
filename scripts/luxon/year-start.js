import { DateTime } from "luxon";
import zones from '../../newer/zonefile/zonefile.2022.js'
let list = Object.keys(zones)
import { getStart } from '../../newer/compute/_lib/yearStart.js'


const hit = function (year) {
  // let tz = list[Math.floor(Math.random() * list.length)]
  let tz = 'America/Vancouver'
  // let year = Math.floor(2023 + (Math.random() * 15))
  // let year = 2005
  let epoch = DateTime.fromObject({ year, }).setZone(tz).startOf('year').toMillis()
  return [year, tz, epoch]
}

let arr = []
for (let i = 1968; i < 2030; i += 1) {
  arr.push(hit(i))
}
// console.log(hit())
console.log(JSON.stringify(arr, null, 2))

