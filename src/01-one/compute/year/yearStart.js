import getOffset from './getOffset.js'

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



// get UTC epoch for jan 1
const yearStart = function (year, tz, world) {
  let epoch = utcStart(year, world)
  epoch -= getOffset(tz, world)
  return epoch
}


export default yearStart
