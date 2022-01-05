import { beADate, normalize } from '../../fns.js'
import waterfall from './waterfall.js'

const reverseDiff = function (obj) {
  Object.keys(obj).forEach((k) => {
    obj[k] *= -1
  })
  return obj
}

// this method counts a total # of each unit, between a, b.
// '1 month' means 28 days in february
// '1 year' means 366 days in a leap year
const main = function (a, b, unit) {
  b = beADate(b, a)
  //reverse values, if necessary
  let reversed = false
  if (a.isAfter(b)) {
    let tmp = a
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
