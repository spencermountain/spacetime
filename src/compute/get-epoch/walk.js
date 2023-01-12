import { DAY, HOUR, MINUTE, SECOND } from '../_lib/millis.js'
import months from '../_lib/months.js'
import isLeap from '../_lib/isLeap.js'

// compare two cal objects
const ensureEqual = function (a, b) {
  const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
  for (let i = 0; i < units.length; i += 1) {
    let unit = units[i]
    if (a[unit] !== b[unit]) {
      console.error('\n----\nMis-matched unit in walk:', unit) // eslint-disable-line
      console.error(a, '\n', b) // eslint-disable-line
      return false
    }
  }
  //it's the same
  return true
}

const diffDays = function (from, to) {
  let diff = 0
  // increment months
  for (let n = from.month; n < to.month; n += 1) {
    // console.log(`+${months[n - 1].len} for ${months[n - 1].long}`)
    diff += months[n - 1].len
    if (n === 2 && isLeap(from.year)) {
      diff += 1 //add another
    }
  }
  // delta days (can be negative)
  let days = to.date - from.date
  diff += days
  return diff
}

// step forward and count milliseconds 
// until the two calendar objects meet
const walk = function (epoch, from, to) {
  // console.log(`from: ${from.year}-${from.month}-${from.date}`)
  // console.log(`  to: ${to.year}-${to.month}-${to.date}`)

  // increment months/days  (we are guaranteed to be in the same year)
  let diff = diffDays(from, to)
  epoch += diff * DAY
  from.month = to.month
  from.date = to.date

  // add-up remaining hours
  diff = to.hour - from.hour
  epoch += diff * HOUR
  from.hour += diff

  // remaining minutes
  diff = to.minute - from.minute
  epoch += diff * MINUTE
  from.minute += diff

  // add-up remaining seconds
  diff = to.second - from.second
  epoch += diff * SECOND
  from.second += diff

  // add-up remaining milliseconds
  diff = to.millisecond - from.millisecond
  epoch += diff
  from.millisecond += diff

  // make sure we are complete
  ensureEqual(from, to)

  return epoch
}
export default walk