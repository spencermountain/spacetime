import isLeap from './isLeap.js'
const leap = 31622400000
const nonLeap = 31536000000

// get UTC epoch for jan 1
const yearStart = function (year) {
  let epoch = 0
  for (let y = 1970; y < year; y += 1) {
    if (isLeap(y)) {
      epoch += leap
    } else {
      epoch += nonLeap
    }
  }
  return epoch
}
export default yearStart

//   '2018': 1514764800000,
console.log(yearStart(2018) === 1514764800000)