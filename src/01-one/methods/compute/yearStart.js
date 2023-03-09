// import isLeap from './compute/_lib/isLeap.js'
// import { YEAR, LEAPYEAR, DAY, HOUR } from './compute/_lib/millis.js'
// import zoneFile from '../../../zonefile/iana.js'
// import zoneFile from '../../../02-two/zones/data/index.js'

// const MAXOFFSET = -DAY * 2
const memo = {}

const utcStart = function (year, world) {
  const { YEAR, DAY } = world.model.ms
  const isLeapYear = world.methods.isLeapYear
  // try and compute this only once
  if (memo.hasOwnProperty(year)) {
    return memo[year]
  }
  let epoch = 0
  // count up from 1970
  if (year > 1970) {
    for (let y = 1970; y < year; y += 1) {
      if (isLeapYear(y)) {
        epoch += YEAR + DAY
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
      if (isLeapYear(y)) {
        epoch -= YEAR + DAY
      } else {
        epoch -= YEAR
      }
      memo[y] = epoch
    }
  }
  return epoch
}

const januaryOffset = function (tz, world) {
  const { HOUR } = world.model.ms
  // apply timezone offset to it
  let zoneFile = world.zones
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
const yearStart = function (year, tz, world) {
  let epoch = utcStart(year, world)
  epoch -= januaryOffset(tz, world)
  return epoch
}


export default yearStart
