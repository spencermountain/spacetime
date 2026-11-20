import { beADate, normalize } from '../../fns.ts'
import waterfall from './waterfall.ts'
import type { Spacetime, SpacetimeInput, TimeUnit } from '../../types/index.ts'

const reverseDiff = function (obj: Record<string, number>): Record<string, number> {
  Object.keys(obj).forEach((k) => {
    obj[k] *= -1
  })
  return obj
}

const scales: Record<string, [string, number]> = {
  seasons: ['months', 3],
  decades: ['years', 10],
  centurys: ['years', 100]
}

// this method counts a total # of each unit, between a, b.
// '1 month' means 28 days in february
// '1 year' means 366 days in a leap year
// the whole table of differences, or just one unit
function main(a: Spacetime, d: SpacetimeInput, unit?: TimeUnit) {
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
    // whole seasons, decades and centuries are counted from the months and years
    if (Object.prototype.hasOwnProperty.call(scales, unit)) {
      const [base, size] = scales[unit]
      return Math.trunc(obj[base] / size) || 0 // (avoid a negative zero)
    }
    return obj[unit]
  }
  return obj
}

export default main
