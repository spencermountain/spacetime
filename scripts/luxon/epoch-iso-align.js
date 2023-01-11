import { DateTime } from "luxon";
import zones from '../../newer/zonefile/zonefile.2022.js'
let list = Object.keys(zones)
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const YEAR = 365 * DAY

let now = new Date('1980-01-01').getTime()
const hit = function () {
  // let tz = list[Math.floor(Math.random() * list.length)]
  // let tz = 'Australia/Adelaide'
  // let tz = 'America/Vancouver'
  let tz = 'America/Panama'
  let epoch = now + (Math.random() * YEAR)
  epoch = parseInt(epoch, 10)
  let iso = DateTime.fromMillis(epoch).setZone(tz,).toISO({ includeOffset: false, })//{ keepCalendarTime: true }
  return [epoch, iso, tz]
}

let arr = []
for (let i = 0; i < 400; i += 1) {
  arr.push(hit())
}
// console.log(hit())
console.log(JSON.stringify(arr, null, 2))
