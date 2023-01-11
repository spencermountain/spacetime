import spacetime from './newer/src/index.js'
import { getYear } from './newer/src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'


let arr = [
  [1672555409576, "2023-01-01T01:43:29.576", "America/Vancouver"],
  // [1672560000000, "2023-01-01T00:00:00.000", "America/Vancouver"],
  // [1672566986654, "2023-01-01T04:56:26.654", "America/Vancouver"],
  // [1672581460527, "2023-01-01T08:57:40.527", "America/Vancouver"],
  // [1672591436919, "2023-01-01T11:43:56.919", "America/Vancouver"],
  // [1673683410797, "2023-01-14T03:03:30.797", "America/Vancouver"],
  // [1676038536143, "2023-02-10T09:15:36.143", "America/Vancouver"],
  // [-88802406245, "1967-03-09T23:39:53.755", "Asia/Qatar"],
  // [-397584747010, "1957-05-27T03:47:32.990", "Indian/Cocos"],
  // [1529219882083, "2018-06-17T03:18:02.083", "Asia/Dushanbe"],
  // [1306852593893, "2011-05-31T10:36:33.893", "Asia/Aqtobe"],
  // [-63162000000, "1967-01-01T00:00:00.000", "Europe/Paris"],
  // [3007864479, "1970-02-04T14:31:04.479", "America/Inuvik"],
  // [11912630989, "1970-05-18T17:03:50.989", "Pacific/Pago_Pago"],
]

arr.forEach(a => {
  let [epoch, want, tz] = a
  let { start, year } = getYear(epoch, tz)
  console.log(year)
  // let iso = spacetime(epoch, tz).format('{iso}')
  // console.log(iso === want)
  // console.log('have: ', cyan(iso))
  // console.log('want: ', red(want))
  // let lux = DateTime.fromMillis(start).setZone(tz, { keepCalendarTime: true }).toISO({ includeOffset: false, })
  // console.log('lux:', lux)
})


