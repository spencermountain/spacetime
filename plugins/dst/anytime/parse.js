import spacetime from '../../../src/index.js'
import changes from '../tzdb/parse.js'

import { DateTime } from "luxon";

const fromEpoch = function (epoch, tz) {
  return DateTime.fromMillis(epoch).setZone(tz)
}


const hour = 1000 * 60 * 60
let start = 2020
const doTZ = function (tz) {
  let arr = []
  for (let y = start; y < start + 5; y += 1) {
    // add start of year
    // let s = spacetime.now(tz)
    // s = s.year(y).startOf('year')
    // arr.push([s.epoch, y, 1, 1])
    // add dst
    if (changes[tz][y]) {
      // add dst start
      let epoch = changes[tz][y][0]
      let on = fromEpoch(epoch, tz)
      arr.push([epoch, on.year, on.month, on.day, on.hour])

      // add dst end
      epoch = changes[tz][y][1]
      // epoch -= hour
      // epoch += hour
      let off = fromEpoch(epoch, tz)
      arr.push([epoch, off.year, off.month, off.day, off.hour])
    }
  }
  return arr
}

let arr = ['America/Toronto', 'America/Vancouver', 'europe/london']
let out = arr.reduce((h, id) => {
  h[id] = doTZ('America/Toronto')
  return h
}, {})
console.log(out)