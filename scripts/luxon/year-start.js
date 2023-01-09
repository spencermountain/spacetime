import { DateTime } from "luxon";
import zones from '../../newer/zonefile/zonefile.2022.js'
let list = Object.keys(zones)
import { getStart } from '../../newer/compute/_lib/yearStart.js'


const hit = function () {
  let tz = list[Math.floor(Math.random() * list.length)]
  let year = Math.floor(1950 + (Math.random() * 150))
  let epoch = DateTime.fromObject({ year, }).setZone(tz).startOf('year').toMillis()
  return [year, tz, epoch]
}

let arr = []
for (let i = 0; i < 20; i += 1) {
  arr.push(hit())
}
// console.log(hit())
console.log(JSON.stringify(arr, null, 2))