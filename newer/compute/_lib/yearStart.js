import isLeap from './isLeap.js'
import { YEAR, LEAPYEAR } from './millis.js'
import zoneFile from '../../zonefile/zonefile.2022.js'
import { HOUR } from './millis.js'

let memo = {}

// get UTC epoch for jan 1
const getStart = function (year, tz) {
  // only calculate this once
  if (memo.hasOwnProperty(year)) {
    return memo[year]
  }
  let epoch = 0
  for (let y = 1970; y < year; y += 1) {
    if (isLeap(y)) {
      epoch += LEAPYEAR
    } else {
      epoch += YEAR
    }
    memo[year] = epoch
  }
  // apply timezone offset to it
  if (tz && zoneFile.hasOwnProperty(tz)) {
    let offset = zoneFile[tz].offset || 0
    epoch -= offset * HOUR
  }
  return epoch
}

const getYear = function (epoch, tz) {
  let e = 0
  let year = 1970
  while (e <= epoch) {
    let size = YEAR
    if (isLeap(year)) {
      size = LEAPYEAR
    }
    let tmp = e + size
    if (tmp > epoch) {
      break
    }
    e = tmp
    year += 1
  }
  // apply timezone offset to it
  if (tz && zoneFile.hasOwnProperty(tz)) {
    let offset = zoneFile[tz].offset || 0
    e += offset * HOUR
  }
  return { start: e, year }
}

export { getStart, getYear }
