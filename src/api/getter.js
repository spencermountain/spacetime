import getDay from '../compute/_lib/getDay.js'
import config from '../config.js'

let getter = {
  year: (cal) => cal.year,
  month: (cal) => cal.month,
  date: (cal) => cal.date,
  hour: (cal) => cal.hour,
  minute: (cal) => cal.minute,
  second: (cal) => cal.second,
  day: (cal) => getDay(cal.year, cal.month, cal.date),
  ampm: (cal) => cal.hour < 12 ? 'am' : 'pm',
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
  }
}
// wednesday/friday
getter.dayName = (cal) => {
  let n = getter.day(cal)
  return config.days.longForm[n]
}
getter.monthName = (cal) => {
  let n = getter.month(cal) - 1
  return config.months.longForm[n]
}
export default getter