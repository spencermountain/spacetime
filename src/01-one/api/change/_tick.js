// import monthLen from '../../compute/_lib/monthLen.js'
import { getUnit } from '../unit/_lib.js'

let assumed = {
  month: 1, //co-erce any zeros to 1s
  date: 1, // (same)
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
}

const rollDays = function (cal, world) {
  const { monthLen } = world.methods
  let len = monthLen(cal.month, cal.year, world)
  while (cal.date > len) {
    cal.date -= len
    cal.month += 1
    if (cal.month > 12) {
      cal.year += Math.floor(cal.month / 12)
      cal.month = cal.month % 12
    }
    len = monthLen(cal.month, cal.year, world)
  }
  return cal
}

const rollFwd = function (cal, world) {
  const { monthLen } = world.methods
  if (cal.millisecond > 999) {
    cal.second += Math.floor(cal.millisecond / 1000)
    cal.millisecond = cal.millisecond % 1000
  }
  // // second
  if (cal.second > 59) {
    cal.minute += Math.floor(cal.second / 60)
    cal.second = cal.second % 60
  }
  // // minute
  if (cal.minute > 59) {
    cal.hour += Math.floor(cal.minute / 60)
    cal.minute = cal.minute % 60
  }
  // hour (1-based)
  if (cal.hour > 24) {
    cal.date += Math.floor(cal.hour / 24)
    cal.hour = cal.hour % 24
  }
  // resolve the month, first
  if (cal.month > 12) {
    cal.year += Math.floor(cal.month / 12)
    cal.month = cal.month % 12
  }
  // now we can do the date+month
  let len = monthLen(cal.month, cal.year, world)
  if (cal.date > len) {
    cal = rollDays(cal, world)
  }
  return cal
}

const rollBkwd = function (cal, world) {
  const { monthLen } = world.methods
  // fix negatives
  while (cal.millisecond < 0) {
    cal.second -= 1
    cal.millisecond += 1000
  }
  while (cal.second < 0) {
    cal.minute -= 1
    cal.second += 60
  }
  while (cal.minute < 0) {
    cal.hour -= 1
    cal.minute += 60
  }
  while (cal.hour < 0) {
    cal.date -= 1
    cal.hour += 24
  }
  while (cal.date < 1) {
    cal.month -= 1
    if (cal.month < 1) {
      cal.year -= 1
      cal.month += 12
    }
    let len = monthLen(cal.month, cal.year, world)
    cal.date += len
  }
  while (cal.month < 1) {
    cal.year -= 1
    cal.month += 12
  }
  return cal
}

// do a calendar-walk
const walk = function (cal, n, unit, world) {
  // console.log(n, unit)
  cal = Object.assign({}, assumed, cal)
  unit = getUnit(unit)
  cal[unit] += n
  // roll backward
  cal = rollBkwd(cal, world)
  // roll forward
  cal = rollFwd(cal, world)
  return cal
}
export default walk

// console.log(walk({ year: 2019, month: 4, date: 4 }))