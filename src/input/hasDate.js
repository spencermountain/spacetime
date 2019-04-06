const monthLengths = require('../data/monthLengths')
const isLeapYear = require('../fns').isLeapYear

//given a month, return whether day number exists in it
const hasDate = obj => {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true) {
    return false
  }
  //support leap-year in february
  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true
    } else {
      return obj.date <= 28
    }
  }
  //is this date too-big for this month?
  let max = monthLengths[obj.month] || 0
  if (obj.date <= max) {
    return true
  }
  return false
}
module.exports = hasDate
