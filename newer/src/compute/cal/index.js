import { getYear } from '../_lib/yearStart.js'
import { getDate, getTime } from './walk.js'
import { DAY, HOUR } from '../_lib/millis.js'
import getDst from '../changes/index.js'

const isFloat = function (n) {
  return Number(n) === n && n % 1 !== 0;
}
const isInt = function (n) {
  return Number(n) === n && n % 1 === 0;
}

// take an epoch, return {month, year, date...}
const computeCal = function (epoch, tz) {
  // get Jan 1 of the year
  let { start, year } = getYear(epoch, tz)
  let cal = {
    year,
    month: 1,
    date: 1,
    hour: 0,
    second: 0,
    millisecond: 0
  }
  // walk the days
  let diff = epoch - start;
  let daysDiff = Math.floor(diff / DAY);

  // compute month, date
  let resDate = getDate(daysDiff, year)
  Object.assign(cal, resDate)

  // compute hour, min, sec..
  let deltaMs = diff - (daysDiff * DAY)
  let resMins = getTime(deltaMs)
  Object.assign(cal, resMins)

  // consult any DST changes
  let changes = getDst(tz, year)
  // find the latest change
  for (let i = changes.length - 1; i >= 0; i -= 1) {
    // console.log(changes[i].epoch, epoch)
    if (epoch >= changes[i].epoch) {
      // console.log(changes[i].offset)
      let delta = changes[i].delta
      if (isInt(delta)) {
        cal.hour += delta
      } else {
        cal.minute += delta * 60  //TODO: this is sorta weak
      }
      break
    }
  }
  // console.log(cal)

  return cal
}
export default computeCal
