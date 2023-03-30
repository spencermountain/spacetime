import { parseMonth, parseAmpm, parseTime, parseHour, parseYear, parseDate, parseOffset } from '../../parse/text/units/index.js'

const getCal = (s) => {
  return s.world.methods.getCal(s.epoch, s.tz, s.world)
}
const fromCal = function (s, cal) {
  let epoch = s.world.methods.getEpoch(cal, s.tz, s.world)
  return s._from(epoch, s.tz)
}

let fns = {
  year: (s, input, fwd) => {
    let cal = getCal(s)
    cal.year = parseYear(input)
    return fromCal(s, cal)
  },
  month: (s, input, fwd) => {
    let cal = getCal(s)
    cal.month = parseMonth(input)
    return fromCal(s, cal)
  },
  date: (s, input, fwd) => {
    let cal = getCal(s)
    cal.date = parseDate(input)
    return fromCal(s, cal)
  },
  hour: (s, input, fwd) => {
    let cal = getCal(s)
    cal.hour = parseHour(input)
    return fromCal(s, cal)
  },
  minute: (s, input, fwd) => {
    let cal = getCal(s)
    cal.minute = Number(input)
    return fromCal(s, cal)
  },
  second: (s, input, fwd) => {
    let cal = getCal(s)
    cal.second = Number(input)
    return fromCal(s, cal)
  },
  millisecond: (s, input, fwd) => {
    let cal = getCal(s)
    cal.millisecond = Number(input)
    return fromCal(s, cal)
  },
  ampm: (s, input, fwd) => {
    let cal = getCal(s)
    let h = cal.hour
    let val = parseAmpm(input)
    if (val === 'am') {
      h = h > 12 ? h - 12 : h
    } else if (val === 'pm') {
      h = h < 12 ? h + 12 : h
    }
    cal.hour = h
    return fromCal(s, cal)
  },

  // eg '1970'
  decade: function (s, input, fwd) {
    let cal = getCal(s)
    let r = cal.year % 10
    cal.year = Number(input) + r
    return fromCal(s, cal)
  },
  // eg '1900'
  century: function (s, input, fwd) {
    let cal = getCal(s)
    let r = cal.year % 100
    cal.year = Number(input) + r
    return fromCal(s, cal)
  },
  // eg 1
  millenium: function (s, input, fwd) {
    let cal = getCal(s)
    let r = cal.year % 1000
    let m = Number(input) - 1
    cal.year = (m * 1000) + r
    return fromCal(s, cal)
  },

  era: (s, input, fwd) => {
    let cal = getCal(s)
    input = input.toLowerCase().replace(/\./g, '').trim()
    if (input === 'bc' && cal.year > 0) {
      cal.year *= -1
    }
    return fromCal(s, cal)
  },
  quarter: (s, input, fwd) => {
    let cal = getCal(s)
    cal = Object.assign(cal, { date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 })
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
    return fromCal(s, cal)
  },

  hourFloat: (s, input, fwd) => {
    input = Number(input)
    let cal = getCal(s)
    cal.hour = Math.floor(input)
    cal.minute = Math.floor((input % 1) * 60)// (0.25 -> 15)
    return fromCal(s, cal)
  },
  hour12: (s, input, fwd) => {
    if (typeof input === 'string') {
      input = parseTime(input).hour
    } else {
      input = parseInt(input, 10)
    }
    let cal = getCal(s)
    cal.hour = input
    return fromCal(s, cal)
  },
  offset: (s, input) => {
    let n = parseOffset(input)
    //TODO: 
  },
  time: (s, input, fwd) => {
    let cal = Object.assign(getCal(s), parseTime(input))
    return fromCal(s, cal)
  },

}
fns.monthName = fns.month
// console.log(Object.keys(fns))
export default fns