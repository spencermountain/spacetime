import isLeap from './isLeap.js'
import { YEAR, LEAPYEAR, DAY, HOUR } from './millis.js'
// import zoneFile from '../../../zonefile/iana.js'
import zoneFile from '../../../02-two/zones/zones.js'

const MAXOFFSET = -DAY * 2
const memo = {}

const utcStart = function (year) {
  // try and compute this only once
  if (memo.hasOwnProperty(year)) {
    return memo[year]
  }
  let epoch = 0
  // count up from 1970
  if (year > 1970) {
    for (let y = 1970; y < year; y += 1) {
      if (isLeap(y)) {
        epoch += LEAPYEAR
      } else {
        epoch += YEAR
      }
      memo[y + 1] = epoch
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
      memo[y] = epoch
    }
  }
  return epoch
}

const januaryOffset = function (tz) {
  // apply timezone offset to it
  if (tz && zoneFile.hasOwnProperty(tz) && zoneFile[tz]) {
    let zone = zoneFile[tz]
    let offset = zone.offset || 0
    // are we in DST on Jan 1st?
    // all 16 southern hemisphere zones w/ DST
    if (zone.hem === 's' && zone.dst) {
      offset += zone.change || 1
    }
    return offset * HOUR
  }
  return 0
}

// get UTC epoch for jan 1
const getStart = function (year, tz) {
  let epoch = utcStart(year)
  epoch -= januaryOffset(tz)
  return epoch
}

// from a random epoch, get it's Jan 1st alignment
const getYear = function (target, tz) {
  let epoch = 0
  // apply timezone offset to it
  epoch -= januaryOffset(tz)
  let year = 1970
  // count upwards from 1970
  if (target > MAXOFFSET) {
    while (epoch <= target) {
      let size = YEAR
      if (isLeap(year)) {
        size = LEAPYEAR
      }
      let tmp = epoch + size
      if (tmp > target) {
        break
      }
      epoch = tmp
      year += 1
    }
  } else {
    // count downwards from 1970
    while (epoch > target) {
      let size = YEAR
      if (isLeap(year)) {
        size = LEAPYEAR
      }
      epoch -= size
      year -= 1
    }
  }
  return { start: epoch, year }
}

export { getStart, getYear }
