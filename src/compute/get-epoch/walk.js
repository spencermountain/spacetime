import { DAY, HOUR } from '../_lib/millis.js'
import months from '../_lib/months.js'

// step forward and count milliseconds 
// until the two calendar objects meet
const walk = function (epoch, from, to) {

  // we are guaranteed to be in the same year
  if (from.year !== to.year) {
    console.error('mis-matched year in walk')
  }
  // add months (tricky)
  for (let i = from.month; i < to.month; i += 1) {

  }
  // add-up remaining days

  // add-up remaining hours

  // add-up remaining minutes

  // add-up remaining seconds

  // add-up remaining milliseconds

  return epoch
}
export default walk