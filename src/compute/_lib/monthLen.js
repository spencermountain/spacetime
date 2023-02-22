import isLeapYear from './isLeap.js'
import months from './months.js'

const monthLen = function (n, year) {
  if (n === 2 && isLeapYear(year)) {
    return 29
  }
  return months[n - 1].len
}
export default monthLen
