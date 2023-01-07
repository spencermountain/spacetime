import { getStart } from '../_lib/yearStart.js'
import getDay from '../_lib/getDay.js'
import isLeapYear from '../_lib/isLeap.js'
import { HOUR, DAY } from '../_lib/millis.js'
import MONTHS from '../_lib/months.js'

const monthLengths = MONTHS.map(o => o.len)

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
  let date = 1
  let month = obj.month
  let epoch = getStart(year)
  // go to the correct month
  epoch += addMonths(obj.month, year)
  // go to the correct day
  let days = toWeekDay(obj, year)
  date += days
  epoch += days * DAY
  // go to the correct week
  days = toRightWeek(obj.num, days, obj.month)
  epoch += days * DAY
  date += days
  // go to the correct hour
  epoch += (obj.hour || 0) * HOUR
  // go to the correct offset
  epoch -= offset * 60 * 60 * 1000
  // console.log(new Date(epoch))

  return { epoch, month, date }
}
// 2nd tuesday
// console.log(calc({ month: 10, day: 2, num: 2, hour: 2 }, 2022))

export default calc