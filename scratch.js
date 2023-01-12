import spacetime from './src/index.js'
import { getYear } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'


const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'




let arr = [

  // [1614496652775, "2021-02-27T23:17:32.775", "America/Vancouver"], // dst off

  // [1616018072663, "2021-03-17T14:54:32.663", "America/Vancouver"], //dst on

  // [1638930726826, "2021-12-07T18:32:06.826", "America/Vancouver"], //dst off

  // [1296227116982, "2011-01-28T20:05:16.982", "Asia/Karachi"],
  [1296252300577, "2011-01-29T03:05:00.577", "Asia/Karachi"],
  // [1296287424231, "2011-01-29T12:50:24.231", "Asia/Karachi"],
]

arr.forEach(a => {
  let [epoch, want, tz] = a
  // let { start, year } = getYear(epoch, tz)
  let iso = spacetime(want, tz).format('{iso-medium}')
  console.log(iso === want)
  console.log('have: ', cyan(iso))
  console.log('want: ', red(want))
  // let lux = DateTime.fromMillis(epoch).setZone(tz).toISO({})
  // console.log('lux:', lux)

  // let s = old(epoch, tz)
  // console.log('spa:', s.iso())
})


// let input = "2023-12-25T01:23:20.030-05:45"
// input = '2012-06'
// let input = [2020, 7, 23, 4]
// let s = spacetime(input, "America/Vancouver")
// console.log(s.date())
// console.log(s.iso())
// let lux = DateTime.fromMillis(out).setZone("America/Toronto")
// console.log(lux.toISO({}))
