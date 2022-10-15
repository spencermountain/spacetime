import isLeap from './isLeap.js'
import { YEAR, LEAPYEAR } from './millis.js'


// get UTC epoch for jan 1
const getStart = function (year) {
  let n = 0
  for (let y = 1970; y < year; y += 1) {
    if (isLeap(y)) {
      n += LEAPYEAR
    } else {
      n += YEAR
    }
  }
  return n
}

const getYear = function (epoch) {
  let e = 0
  let year = 1970
  while (e <= epoch) {
    if (isLeap(year)) {
      e += LEAPYEAR
    } else {
      e += YEAR
    }
    year += 1
    console.log(year, e)
  }
  return { start: e, year }
}

export { getStart, getYear }

// console.log(getYear(1514764824000) === 2018)
let num = 347159200000
console.log(getYear(num).start < num)