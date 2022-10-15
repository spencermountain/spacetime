import isLeap from './isLeap.js'
import { YEAR, LEAPYEAR } from './millis.js'


// get UTC epoch for jan 1
const getEpoch = function (year) {
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
  // if (epoch < 0) {
  // }

  let e = 0
  let year = 1970
  while (e < epoch) {
    e += YEAR
    if (e > epoch) {
      return year
    }
    year += 1
  }
  return year
}
export { getEpoch, getYear }

// console.log(getYear(1514764824000) === 2018)
// console.log(getYear(1546300800000))