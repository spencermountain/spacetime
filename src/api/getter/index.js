import getDay from '../../compute/_lib/getDay.js'
import config from '../../config.js'
import months from '../../compute/_lib/months.js'
import isLeapYear from '../../compute/_lib/isLeap.js'

let getter = {
  year: (cal) => cal.year,
  month: (cal) => cal.month - 1,//javascript uses 0-based months!
  date: (cal) => cal.date,//1-based dates!
  hour: (cal) => cal.hour,
  minute: (cal) => cal.minute,
  second: (cal) => cal.second,
  day: (cal) => getDay(cal.year, cal.month, cal.date),
  ampm: (cal) => cal.hour < 12 ? 'am' : 'pm',
  decade: (cal) => Math.floor(cal.year / 10) * 10,//  eg '1970'
  century: (cal) => Math.floor(cal.year / 100) * 100,//  eg '1900'
  millenium: (cal) => {
    let num = Math.floor(cal.year / 1000)
    return num >= 0 ? num + 1 : num// millenia are 1-based, in AD
  },
  offset: (cal) => cal.offset * 60,
  era: (cal) => cal.year < 0 ? 'BC' : 'AD',
  quarter: (cal) => {
    let m = cal.month
    if (m < 3) {
      return 1
    } else if (m < 6) {
      return 2
    } else if (m < 9) {
      return 3
    }
    return 4
  },
  hour12: (cal) => {
    let hour = cal.hour
    if (hour > 12) {
      return hour - 12
    }
    if (hour === 0) {
      return 12
    }
    return hour
  },
  hourFloat: (cal) => {
    let minute = cal.minute
    minute = minute / 60
    return cal.hour + minute
  },
  dayOfYear: (cal) => {
    let sum = cal.date
    //count the num days in each month
    for (let i = 0; i < cal.month - 1; i++) {
      sum += months[i].len
      if (i === 1 && isLeapYear(cal.year)) {
        sum += 1// feb 29th
      }
    }
    return sum
  },
  week: (cal) => {
    return null
  }
}
// wednesday/friday
getter.dayName = (cal) => {
  let n = getter.day(cal)
  return config.days.longForm[n]
}
getter.monthName = (cal) => {
  let n = getter.month(cal)
  return config.months.longForm[n]
}

export default getter