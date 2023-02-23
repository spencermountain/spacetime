import { getYear } from '../_lib/yearStart.js'
import { getDate, getTime } from './walk.js'
import { DAY, HOUR } from '../_lib/millis.js'
// import zoneFile from '../../../zonefile/iana.js'
import zoneFile from '../../zones/index.js'
import getDst from '../changes/index.js'

// take an epoch, return {month, year, date...}
const computeCal = function (epoch, tz) {
  // get Jan 1 of the year
  let { start, year } = getYear(epoch, tz)
  let zone = zoneFile[tz] || {}
  let cal = {
    year,
    month: 1,
    date: 1,
    hour: 0,
    second: 0,
    millisecond: 0,
    offset: zone.offset || 0
  }
  // kick the epoch around, according to our DST offset
  let changes = getDst(tz, year)
  if (zone.hem === 's') {
    // southern hemisphere
    for (let i = 0; i < changes.length; i += 1) {
      if (epoch < changes[i].epoch) {
        cal.offset = changes[i].offset
        epoch -= changes[i].delta * HOUR
        break
      }
    }
    cal.offset += 1
  } else {
    // northern hemisphere
    for (let i = changes.length - 1; i >= 0; i -= 1) {
      if (epoch >= changes[i].epoch) {
        cal.offset = changes[i].offset
        epoch += changes[i].delta * HOUR
        break
      }
    }
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
  return cal
}
export default computeCal
