import isLeap from './isLeap.js'
const leap = 31622400000
const nonLeap = 31536000000

// get UTC epoch for jan 1
const getEpoch = function (year) {
  let n = 0
  for (let y = 1970; y < year; y += 1) {
    if (isLeap(y)) {
      n += leap
    } else {
      n += nonLeap
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
    e += nonLeap
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