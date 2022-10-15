import { getEpoch } from '../_lib/yearStart.js'
import getDay from '../_lib/getDay.js'
import isLeapYear from '../_lib/isLeap.js'

const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24

const monthLengths = [
  31, //January - 31 days
  28, //February - 28 days in a common year and 29 days in leap years
  31, //March - 31 days
  30, //April - 30 days
  31, //May - 31 days
  30, //June - 30 days
  31, //July - 31 days
  31, //August - 31 days
  30, //September - 30 days
  31, //October - 31 days
  30, //November - 30 days
  31, //December - 31 days
];

const addMonths = function (months, year) {
  let ms = 0
  for (let i = 0; i < months - 1; i += 1) {
    let days = monthLengths[i]
    if (i === 1 && isLeapYear(year)) {
      days = 29
    }
    ms += days * DAY
  }
  return ms
}

// click forward to the proper weekday
const toWeekDay = function (obj, year) {
  let day = getDay(year, obj.month, 1)
  let want = obj.day
  let diff = 0
  for (let i = 0; i < 7; i += 1) {
    if (day === want) {
      return diff //* DAY
    }
    day += 1
    day = day % 7
    diff += 1
  }
  return 0
}


const toRightWeek = function (num, day, month) {
  if (num === 'first' || num <= 1) {
    return 0
  }
  if (num === 'last') {
    let max = monthLengths[month + 1] || 31
    let days = 0
    for (let i = 0; i < 5; i += 1) {
      days += 7
      if (days + day >= max) {
        return days - 7 //went too far
      }
    }
    console.log('fixme')
    return 3
  }
  let days = (num - 1) * 7
  return days // * DAY
}


const calc = function (obj, year, offset) {
  let epoch = getEpoch(year)
  // go to the correct month
  epoch += addMonths(obj.month, year)
  // go to the correct day
  let days = toWeekDay(obj, year)
  epoch += days * DAY
  // go to the correct week
  days = toRightWeek(obj.num, days, obj.month)
  epoch += days * DAY
  // }
  // go to the correct hour
  epoch += (obj.hour || 0) * HOUR
  // go to the correct offset
  epoch -= offset * 60 * 60 * 1000
  // console.log(new Date(epoch))
  return epoch
}
// 2nd tuesday
// console.log(calc({ month: 10, day: 2, num: 2, hour: 2 }, 2022))

export default calc