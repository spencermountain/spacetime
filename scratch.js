import spacetime from './newer/index.js'
import { getStart } from './newer/compute/_lib/yearStart.js'
import zones from './newer/zonefile/zonefile.2022.js'
import { DateTime } from "luxon";


let arr = [
  // [2004, "America/Vancouver", 1041408000000],
  [1971, "Europe/Paris", 31532400000],
  [1973, "America/Vancouver", 63100800000],
  // [1980, "America/Vancouver", 315561600000],
  // [2005, "America/Vancouver", 1072944000000]
]

arr.forEach(a => {
  let [year, tz, epoch] = a

  let n = getStart(year, tz)
  console.log(n)
  console.log(n === epoch, `year-start ${year} ${tz}`)
  console.log('have', DateTime.fromMillis(n).setZone(tz).toISO())
  console.log('want', DateTime.fromMillis(epoch).setZone(tz).toISO(), '\n')

})
