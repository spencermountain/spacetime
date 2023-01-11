import spacetime from './newer/src/index.js'
import { getYear } from './newer/src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";



let arr = [
  // [1676038536143, "2023-02-10T09:15:36.143", "America/Vancouver"],
  // [-88802406245, "1967-03-09T23:39:53.755", "Asia/Qatar"],
  // [-397584747010, "1957-05-27T03:47:32.990", "Indian/Cocos"],
  // [1529219882083, "2018-06-17T03:18:02.083", "Asia/Dushanbe"],
  // [1306852593893, "2011-05-31T10:36:33.893", "Asia/Aqtobe"],
  // [-63162000000, "1967-01-01T00:00:00.000", "Europe/Paris"],
  // [3007864479, "1970-02-04T14:31:04.479", "America/Inuvik"],
  [11912630989, "1970-05-18T17:03:50.989", "Pacific/Pago_Pago"],
]

arr.forEach(a => {
  let [epoch, want, tz] = a
  let { start, year } = getYear(epoch, tz)
  console.log(year)
  let iso = spacetime(start, tz).format('{iso}')
  console.log('have: ', iso)
  // console.log('want: ', want)
  // console.log(iso === want)
  let lux = DateTime.fromMillis(start).setZone(tz, { keepCalendarTime: true }).toISO({ includeOffset: false, })
  console.log('lux:', lux)
})


