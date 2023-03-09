import isLeapYear from './compute/_lib/isLeap.js'
import months from './compute/_lib/months.js'

const monthLen = function (n, year) {
  if (n === 2 && isLeapYear(year)) {
    return 29
  }
  return months[n - 1].len
}
export default monthLen
