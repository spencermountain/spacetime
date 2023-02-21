import Spacetime from '../spacetime.js'
import getEpoch from '../compute/epoch/index.js'
import config from '../config.js'
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
  ampm: (input, cal, tz) => {
    let h = cal.hour
    let val = parseAmpm(input)
    if (h < 12 && val === 'pm') {
      cal.hour += 12
    }
    if (h > 12 && val === 'am') {
      cal.hour -= 12
    }
    return factory(cal, tz)
  },
  // // day: (cal) => getDay(cal.year, cal.month, cal.date),
}