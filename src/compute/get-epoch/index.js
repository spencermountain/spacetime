import { getStart } from '../_lib/yearStart.js'
// import { DAY, HOUR } from '../_lib/millis.js'
import getDst from '../changes/index.js'
import validate from './validate.js'

// compare two cal objects
const isAfter = function (a, b) {
  const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
  for (let i = 0; i < units.length; i += 1) {
    let unit = units[i]
    if (a[unit] > b[unit]) {
      return true
    }
    if (a[unit] < b[unit]) {
      return false
    }
  }
  //it's the same
  return true
}

const getEpoch = function (cal, tz) {
  cal = validate(cal)

  // get jan 1st
  let epoch = getStart(cal.year, tz)
  let changes = getDst(tz, cal.year).reverse()

  let change = changes.find(c => isAfter(cal, c))
  console.log(change)
  // console.log(epoch)
  // console.log(cal)
  return epoch
}
export default getEpoch