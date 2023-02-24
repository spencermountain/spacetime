import monthLen from '../../compute/_lib/monthLen.js'

let assumed = {
  month: 1, //co-erce any zeros to 1s
  date: 1, // (same)
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
}

const rollDays = function (cal) {
  let len = monthLen(cal.month, cal.year)
  while (cal.date > len) {
    cal.date -= len
    cal.month += 1
    if (cal.month > 12) {
      cal.year += Math.floor(cal.month / 12)
      cal.month = cal.month % 12
    }
    len = monthLen(cal.month, cal.year)
  }
  return cal
}

const rollFwd = function (cal) {
  // if (cal.millisecond > 999) {
  //   cal.second += Math.floor(cal.millisecond / 1000)
  //   cal.millisecond = cal.millisecond % 1000
  // }
  // // second
  // if (cal.second > 59) {
  //   cal.minute += Math.floor(cal.second / 60)
  //   cal.second = cal.second % 60
  // }
  // // minute
  // if (cal.minute > 59) {
  //   cal.hour += Math.floor(cal.minute / 60)
  //   cal.minute = cal.minute % 60
  // }
  // hour (1-based)
  // if (cal.hour > 24) {
  //   cal.date += Math.floor(cal.hour / 24)
  //   cal.hour = cal.hour % 24
  // }
  // resolve the month, first
  if (cal.month > 12) {
    cal.year += Math.floor(cal.month / 12)
    cal.month = cal.month % 12
  }
  // now we can do the date+month
  let len = monthLen(cal.month, cal.year)
  if (cal.date > len) {
    cal = rollDays(cal)
  }
  return cal
}


const rollBkwd = function (cal) {
  // fix negative months
  while (cal.month < 1) {
    cal.year -= 1
    cal.month += 12
  }
  while (cal.date < 1) {
    cal.month -= 1
    if (cal.month < 1) {
      cal.year -= 1
      cal.month += 12
    }
    let len = monthLen(cal.month, cal.year)
    cal.date += len
  }
  // return cal
  return cal
}

const mapping = {
  date: 'date',
  dates: 'date',
  day: 'date',
  days: 'date',
  month: 'month',
  months: 'month',
  year: 'year',
  years: 'year',
}

// do a calendar-walk
const walk = function (cal, n, unit) {
  cal = Object.assign({}, assumed, cal)
  if (mapping.hasOwnProperty(unit)) {
    cal[mapping[unit]] += n
  }
  // roll backward
  cal = rollBkwd(cal)
  // roll forward
  cal = rollFwd(cal)
  return cal
}
export default walk

// console.log(walk({ year: 2019, month: 4, date: 4 }))