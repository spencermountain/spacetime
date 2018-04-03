const monthLengths = require('../data/monthLengths')

//given a month, return whether day number exists in it
const hasDate = function(obj) {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true) {
    return false
  }
  let max = monthLengths[obj.month] || 0
  if (obj.date < max) {
    return true
  }
  //todo: handle leap-year february
  return false
}
module.exports = hasDate
