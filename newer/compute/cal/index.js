// import changes from '../changes/build.js'
import { getYear } from '../_lib/yearStart.js'
import isLeapYear from '../_lib/isLeap.js'

import { SEC, MIN, HOUR, DAY } from '../_lib/millis.js'
import MONTHS from '../_lib/months.js'

const monthLengths = MONTHS.map(o => o.len)

const getDate = function (diffDays, year) {
  let res = { month: 1, date: 1 }
  let total = 0
  for (let i = 0; i < MONTHS.length - 1; i += 1) {
    let inMonth = monthLengths[i]
    if (i === 1 && isLeapYear(year)) {
      inMonth = 29
    }
    if (total + inMonth > diffDays) {
      break
    }
    total += inMonth
    res.month += 1
  }
  // add remainder to days
  res.date = diffDays - total
  return res
}

const getTime = function (ms) {
  let res = { hour: 0, minute: 0, second: 0, ms: 0 }
  // get hour
  res.hour = Math.floor(ms / HOUR)
  ms -= res.hour * HOUR
  // get minute
  res.minute = Math.floor(ms / MIN)
  ms -= res.minute * MIN
  // get second
  res.second = Math.floor(ms / SEC)
  ms -= res.second * SEC
  // remainder milliseconds
  res.ms = ms
  return res
}

const computeCal = function (want, tz) {
  // get Jan 1 of the year
  let { start, year } = getYear(want)
  let epoch = start
  let cal = {
    year,
    month: 1,
    date: 1,
    hour: 0,
    second: 0,
    millisecond: 0
  }
  // walk the days
  let diff = want - epoch;
  let daysDiff = Math.floor(diff / DAY);

  // compute month, date
  let resDate = getDate(daysDiff, year)
  console.log(resDate)
  Object.assign(cal, resDate)

  // compute hour, min, sec..
  let deltaMs = diff - (daysDiff * DAY)
  let resMins = getTime(deltaMs)
  Object.assign(cal, resMins)

  return cal
}
export default computeCal
