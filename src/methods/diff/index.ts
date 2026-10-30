import { beADate, normalize } from '../../fns.ts'
import waterfall from './waterfall.ts'
import type { Spacetime, SpacetimeInput } from '../../types/index.ts'

const reverseDiff = function (obj: Record<string, number>): Record<string, number> {
  Object.keys(obj).forEach((k) => {
    obj[k] *= -1
  })
  return obj
}

// this method counts a total # of each unit, between a, b.
// '1 month' means 28 days in february
// '1 year' means 366 days in a leap year
// the whole table of differences, or just one unit
function main(a: Spacetime, d: SpacetimeInput, unit?: string) {
  let b: Spacetime = beADate(d, a)
  //reverse values, if necessary
  let reversed = false
  if (a.isAfter(b)) {
    const tmp = a
    a = b
    b = tmp
    reversed = true
  }
  //compute them all (i know!)
  let obj = waterfall(a, b)
  if (reversed) {
    obj = reverseDiff(obj)
  }
  //return just the requested unit
  if (unit) {
    //make sure it's plural-form
    unit = normalize(unit)
    if (/s$/.test(unit) !== true) {
      unit += 's'
    }
    if (unit === 'dates') {
      unit = 'days'
    }
    return obj[unit]
  }
  return obj
}

export default main
