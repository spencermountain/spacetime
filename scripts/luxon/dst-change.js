import { DateTime } from "luxon";
import zones from '../../newer/zonefile/zonefile.2022.js'
let list = Object.keys(zones)
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const YEAR = 365 * DAY

let tz = 'Australia/Melbourne'
// let now = new Date('2010-04-04T01:00:00.000+10:30').getTime()
let now = new Date('2010-10-02T23:00:00.000+10:30').getTime()
const hit = function (i) {
  let epoch = now + (20 * MIN) * i
  let iso = DateTime.fromMillis(epoch).setZone(tz,).toISO({ includeOffset: false, })//{ keepCalendarTime: true }
  return [epoch, iso, tz]
}

let arr = []
for (let i = 0; i < 15; i += 1) {
  arr.push(hit(i))
}
// console.log(hit())
console.log(JSON.stringify(arr, null, 2))
