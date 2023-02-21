import Spacetime from '../spacetime.js'
import getEpoch from '../compute/epoch/index.js'
import getDay from '../compute/_lib/getDay.js'
import {
  parseMonth,
  parseOffset,
  parseAmpm,
  parseTime,
  parseHour,
  parseYear,
  parseDate
} from '../parse/formats/units/index.js'


const factory = (cal, tz) => {
  let epoch = getEpoch(cal, tz)
  return new Spacetime(epoch, tz)
}

export default {
  year: (input, cal, tz) => {
    cal.year = parseYear(input)
    return factory(cal, tz)
  },
  month: (input, cal, tz) => {
    cal.month = parseMonth(input)
    return factory(cal, tz)
  },
  date: (input, cal, tz) => {
    cal.date = parseDate(input)
    return factory(cal, tz)
  },
  hour: (input, cal, tz) => {
    cal.hour = parseHour(input)
    return factory(cal, tz)
  },
  minute: (input, cal, tz) => {
    cal.minute = Number(input)
    return factory(cal, tz)
  },
  second: (input, cal, tz) => {
    cal.second = Number(input)
    return factory(cal, tz)
  },
  hourFloat: (input, cal, tz) => {
    input = Number(input)
    cal.hour = Math.floor(input)
    cal.minute = Math.floor((input % 1) * 60)// (0.25 -> 15)
    return factory(cal, tz)
  },
  quarter: (input, cal, tz) => {
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
    return factory(cal, tz)
  },
  ampm: (input, cal, tz) => {
    let h = cal.hour
    let val = parseAmpm(input)
    if (val === 'am') {
      h = h > 12 ? h - 12 : h
    } else if (val === 'pm') {
      h = h < 12 ? h + 12 : h
    }
    cal.hour = h
    return factory(cal, tz)
  },
  // eg. 'tues'
  day: (input, cal, tz) => {
    let n = parseDate(input)
    if (n !== null) {
      let have = getDay(cal.year, cal.month, cal.date)
      console.log(n, have)
    }
    return factory(cal, tz)
  }
}