// import isLeapYear from '../_lib/isLeap.js'
// import { SECOND, MINUTE, HOUR } from '../_lib/millis.js'
// import MONTHS from '../_lib/months.js'


const getDate = function (diffDays, year, world) {
  let res = { month: 1, date: 1 }
  if (!diffDays) {
    return res
  }
  const { months } = world.model
  const { isLeapYear } = world.methods
  const monthLengths = months.map(o => {
    if (!o) {
      return 0
    }
    return o.len
  })
  let total = 0
  for (let i = 1; i < months.length; i += 1) {
    let inMonth = monthLengths[i]
    if (i === 2 && isLeapYear(year)) {
      inMonth += 1
    }
    if (total + inMonth > diffDays) {
      break
    }
    total += inMonth
    res.month += 1
  }
  // add remainder to days
  res.date += diffDays - total
  return res
}

const getTime = function (ms, world) {
  const { SECOND, MINUTE, HOUR } = world.model.ms
  let res = { hour: 0, minute: 0, second: 0, millisecond: 0 }
  // get hour
  res.hour = Math.floor(ms / HOUR)
  ms -= res.hour * HOUR
  // get minute
  res.minute = Math.floor(ms / MINUTE)
  ms -= res.minute * MINUTE
  // get second
  res.second = Math.floor(ms / SECOND)
  ms -= res.second * SECOND
  // remainder milliseconds
  res.millisecond = ms
  return res
}

export { getDate, getTime }