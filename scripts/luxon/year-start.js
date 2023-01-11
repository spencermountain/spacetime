import { DateTime } from "luxon";
import zones from '../../newer/zonefile/zonefile.2022.js'
let list = Object.keys(zones)
// import { getStart } from '../../newer/compute/_lib/yearStart.js'


const hit = function () {
  let tz = list[Math.floor(Math.random() * list.length)]
  // let tz = 'Pacific/Auckland'
  let year = Math.floor(1960 + (Math.random() * 10))
  // let year = 20
  let epoch = DateTime.fromObject({ year, }).setZone(tz, { keepCalendarTime: true }).startOf('year').toMillis()

  return [year, tz, epoch]
}

let arr = []
for (let i = 1968; i < 2030; i += 1) {
  arr.push(hit(i))
}
// console.log(arr.map(a => a[2]))
// console.log(hit())
console.log(JSON.stringify(arr, null, 2))

