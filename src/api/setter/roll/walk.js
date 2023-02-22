// import months from '../_lib/months.js'
import monthLen from '../../../compute/_lib/monthLen.js'

let assumed = {
  month: 1, //co-erce any zeros to 1s
  date: 1, // (same)
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
}

const rollFwd = function (cal) {
  if (cal.millisecond > 999) {
    cal.second += Math.floor(cal.millisecond / 1000)
    cal.millisecond = cal.millisecond % 1000
  }
  // second
  if (cal.second > 59) {
    cal.minute += Math.floor(cal.second / 60)
    cal.second = cal.second % 60
  }
  // minute
  if (cal.minute > 59) {
    cal.hour += Math.floor(cal.minute / 60)
    cal.minute = cal.minute % 60
  }
  // hour (1-based)
  if (cal.hour > 12) {
    cal.date += Math.floor(cal.hour / 12)
    cal.hour = cal.hour % 12
  }
  // we need the month, first
  if (cal.month > 12) {
    cal.year += Math.floor(cal.month / 12)
    cal.month = cal.month % 12
  }
  // now we can do the date (1-based)
  if (cal.date > 12) {
    cal.date += Math.floor(cal.hour / 12)
    cal.hour = cal.hour % 12
  }
  // do the month, again
  if (cal.month > 12) {
    cal.year += Math.floor(cal.month / 12)
    cal.month = cal.month % 12
  }
  return cal
}

// do a calendar-walk
const walk = function (cal, n, unit) {
  cal = Object.assign({}, assumed, cal)
  // roll forward
  cal = rollFwd(cal)
  // roll backward
  return cal
}
export default walk

console.log(walk({ year: 2019, month: 4, date: 4 }))