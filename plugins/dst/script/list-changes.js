import spacetime from '../../../src/index.js'
import zones from '../src/zonefile.2022.js'
import { fromSpace } from '../src/calc.js'
import parsedDst from '../src/patterns.js'
let start = 2020

const byTz = function (tz) {
  let s = spacetime.now(tz)
  let dst = zones[tz].pattern
  dst = parsedDst[dst]
  console.log(fromSpace(dst, tz, start))
  let arr = []
  for (let y = start; y < start + 5; y += 1) {
    s = s.year(y).startOf('year')
    arr.push([s.epoch, y, 1, 1])

    // if (dst) {

    // }
  }
  // console.log(s.timezone())
  // console.log(spacetime.timezones())

  return arr
}
console.log(byTz('america/toronto'))