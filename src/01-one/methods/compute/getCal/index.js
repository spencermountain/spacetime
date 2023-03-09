import { getDate, getTime } from './walk.js'

// take an epoch, return {month, year, date...}
const computeCal = function (epoch, tz, world) {
  const { zones, model, methods } = world
  const { getYear, dstChanges } = methods
  const { DAY, HOUR } = model.ms
  // get Jan 1 of the year
  let { start, year } = getYear(epoch, tz, world)
  let zone = zones[tz] || {}
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
  let changes = dstChanges(tz, year, world)
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
  let resDate = getDate(daysDiff, year, world)
  Object.assign(cal, resDate)

  // compute hour, min, sec..
  let deltaMs = diff - (daysDiff * DAY)
  let resMins = getTime(deltaMs, world)
  Object.assign(cal, resMins)
  return cal
}
export default computeCal
