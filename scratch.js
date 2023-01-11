import spacetime from './newer/src/index.js'
import { getYear } from './newer/src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/index.js'


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
  // [1678605600000, "2023-03-12T03:20:00.000", "America/Toronto"],
  // [1699165200000, "2023-11-05T01:20:00.000", "America/Toronto"],

  [1699159200000, "2023-11-05T00:40:00.000", "America/Toronto"],


  // [1699161600000, "2023-11-05T01:20:00.000", "America/Toronto"],
  // [1699162800000, "2023-11-05T01:40:00.000", "America/Toronto"],
  // // (repeat 1am)
  // [1699164000000, "2023-11-05T01:00:00.000", "America/Toronto"],
  // [1699165200000, "2023-11-05T01:20:00.000", "America/Toronto"],
]

arr.forEach(a => {
  let [epoch, want, tz] = a
  // let { start, year } = getYear(epoch, tz)
  let iso = spacetime(epoch, tz).format('{iso}')
  console.log(iso === want)
  console.log('have: ', cyan(iso))
  console.log('want: ', red(want))
  // let lux = DateTime.fromMillis(epoch).setZone(tz).toISO({})
  // console.log('lux:', lux)

  // let s = old(epoch, tz)
  // console.log('spa:', s.iso())
})

// let lux = DateTime.fromMillis(1699167600000).setZone("America/Toronto").plus({ hour: -2 })
// console.log(lux.toMillis({}), lux.toISO({}))

