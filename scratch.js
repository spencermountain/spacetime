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
  // [1678605600000, "2023-03-12T03:20:00.000", "America/Toronto"],
  // [1699165200000, "2023-11-05T01:20:00.000", "America/Toronto"],

  // [1699159200000, "2023-11-05T00:40:00.000", "America/Toronto"],


  [1270308600000, "2010-04-04T02:30:00.000", "Australia/Melbourne"],
  [1270309800000, "2010-04-04T02:50:00.000", "Australia/Melbourne"],
  // repeat 2am
  [1270311000000, "2010-04-04T02:10:00.000", "Australia/Melbourne"],
  [1270312200000, "2010-04-04T02:30:00.000", "Australia/Melbourne"],

  // [1286033400000, "2010-10-03T01:30:00.000", "Australia/Melbourne"],
  // [1286034600000, "2010-10-03T01:50:00.000", "Australia/Melbourne"],
  // // (skip 2am)
  // [1286035800000, "2010-10-03T03:10:00.000", "Australia/Melbourne"],
  // [1286037000000, "2010-10-03T03:30:00.000", "Australia/Melbourne"],
]

// arr.forEach(a => {
//   let [epoch, want, tz] = a
//   // let { start, year } = getYear(epoch, tz)
//   let iso = spacetime(epoch, tz).format('{iso}')
//   console.log(iso === want)
//   console.log('have: ', cyan(iso))
//   console.log('want: ', red(want))
//   // let lux = DateTime.fromMillis(epoch).setZone(tz).toISO({})
//   // console.log('lux:', lux)

//   // let s = old(epoch, tz)
//   // console.log('spa:', s.iso())
// })

// let lux = DateTime.fromMillis(1699167600000).setZone("America/Toronto").plus({ hour: -2 })
// console.log(lux.toMillis({}), lux.toISO({}))

let input = "2023-11-05T01:00:00.000-04:00"
input = [2022, 2, 18]
let out = spacetime(input).iso()
console.log(out)
