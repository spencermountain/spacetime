import isLeap from './isLeap.js'
import { YEAR, LEAPYEAR } from './millis.js'
import zoneFile from '../../zonefile/zonefile.2022.js'
import { HOUR } from './millis.js'


const utcStart = function (year) {
  let epoch = 0
  // count up from 1970
  if (year > 1970) {
    for (let y = 1970; y < year; y += 1) {
      if (isLeap(y)) {
        epoch += LEAPYEAR
      } else {
        epoch += YEAR
      }
    }
  } else {
    // count down from 1970
    let y = 1970
    while (y > year) {
      y -= 1
      if (isLeap(y)) {
        epoch -= LEAPYEAR
      } else {
        epoch -= YEAR
      }
    }
  }
  return epoch
}

// 31536000000-31532400000
// 31536000000-31564800000
// get UTC epoch for jan 1
const getStart = function (year, tz) {
  let epoch = utcStart(year)
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
