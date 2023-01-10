import spacetime from './newer/index.js'
import { getStart } from './newer/compute/_lib/yearStart.js'
import zones from './newer/zonefile/zonefile.2022.js'
import { DateTime } from "luxon";


let arr = [
  // [2004, "America/Vancouver", 1041408000000],
  // [1971, "Europe/Paris", 31532400000],
  // [1971, "Europe/Paris", 31532400000],
  // [1972, "Europe/Paris", 63068400000],
  // [1973, "Europe/Paris", 94690800000],
  // [1972, "America/Vancouver", 63100800000],
  // [2024, "Pacific/Auckland", 1704020400000],
  [2035, "Asia/Tehran", 2051209800000],
  // [1980, "America/Vancouver", 315561600000],
  // [2005, "America/Vancouver", 1072944000000]
]

arr.forEach(a => {
  let [year, tz, epoch] = a
  let n = getStart(year, tz)
  let iso = spacetime(n).format('{iso}')
  console.log(iso)
})
