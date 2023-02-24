import startOf from './startOf.js'
import getCal from '../../compute/cal/index.js'
import {
  parseMonth,
  parseOffset,
  parseAmpm,
  parseTime,
  parseHour,
  parseYear,
  parseDate,
  parseDay
} from '../../parse/formats/units/index.js'

let fns = {
  year: (input, cal) => {
    cal.year = parseYear(input)
    return cal
  },
  month: (input, cal) => {
    cal.month = parseMonth(input)
    return cal
  },
  date: (input, cal) => {
    cal.date = parseDate(input)
    return cal
  },
  hour: (input, cal) => {
    cal.hour = parseHour(input)
    return cal
  },
  minute: (input, cal) => {
    cal.minute = Number(input)
    return cal
  },
  second: (input, cal) => {
    cal.second = Number(input)
    return cal
  },
  time: (input, cal) => {
    return Object.assign(cal, parseTime(input))
  },
  hourFloat: (input, cal) => {
    input = Number(input)
    cal.hour = Math.floor(input)
    cal.minute = Math.floor((input % 1) * 60)// (0.25 -> 15)
    return cal
  },
  quarter: (input, cal) => {
    cal = startOf(cal, 'day')
    if (input === 1) {
      cal.month = 1//jan 1
    } else if (input === 2) {
      cal.month = 3//apr 1
    } else if (input === 3) {
      cal.month = 6//july 1
    } else if (input === 4) {
      cal.month = 9//oct 1
    }
    cal.date = 1
    return cal
  },
  ampm: (input, cal) => {
    let h = cal.hour
    let val = parseAmpm(input)
    if (val === 'am') {
      h = h > 12 ? h - 12 : h
    } else if (val === 'pm') {
      h = h < 12 ? h + 12 : h
    }
    cal.hour = h
    return cal
  },
  era: (input, cal) => {
    input = input.toLowerCase().replace(/\./g, '').trim()
    if (input === 'bc' && cal.year > 0) {
      cal.year *= -1
    }
    return cal
  },

  // dayOfYear: function (input) {
  //   let s = this.startOf('year')
  //   return s.add(input, 'day')
  // },

  // decade: (cal) => Math.floor(cal.year / 10) * 10,//  eg '1970'
  // century: (cal) => Math.floor(cal.year / 100) * 100,//  eg '1900'
  // millenium: (cal) => {
  //   let num = Math.floor(cal.year / 1000)
  //   return num >= 0 ? num + 1 : num// millenia are 1-based, in AD
  // },
  // eg '1970'
  decade: function (input, cal) {
    let r = cal.year % 10
    cal.year = Number(input) + r
    return cal
  },
  // eg '1900'
  century: function (input, cal) {
    let r = cal.year % 100
    cal.year = Number(input) + r
    return cal
  },
  // eg 1
  millenium: function (input, cal) {
    let r = cal.year % 1000
    let m = Number(input) - 1
    cal.year = (m * 1000) + r
    return cal
  },

  startOf: function (unit) {
    let cal = getCal(this.epoch, this.tz)
    return startOf(cal, unit)
  },
  endOf: function (unit) {
    let s = this.startOf(unit)
    s = s.add(1, unit) //go an ounce too far
    s = s.minus(1, 'millisecond')
    return s
  }
}
fns.monthName = fns.month
fns.dayName = fns.day
fns.hour12 = fns.hour
export default fns