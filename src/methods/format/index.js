import { titleCase, zeroPad, ordinal } from '../../fns.js'
import { short } from '../../data/months.js'
import { short as _short } from '../../data/days.js'
import { useTitleCase } from '../../data/caseFormat.js'
import isoOffset from './_offset.js'

const applyCaseFormat = (str) => {
  if (useTitleCase()) {
    return titleCase(str)
  }
  return str
}

// iso-year padding
const padYear = (num) => {
  if (num >= 0) {
    return zeroPad(num, 4)
  } else {
    num = Math.abs(num)
    return '-' + zeroPad(num, 4)
  }
}

const format = {
  day: (s) => applyCaseFormat(s.dayName()),
  'day-short': (s) => applyCaseFormat(_short()[s.day()]),
  'day-number': (s) => s.day(),
  'day-ordinal': (s) => ordinal(s.day()),
  'day-pad': (s) => zeroPad(s.day()),

  date: (s) => s.date(),
  'date-ordinal': (s) => ordinal(s.date()),
  'date-pad': (s) => zeroPad(s.date()),

  month: (s) => applyCaseFormat(s.monthName()),
  'month-short': (s) => applyCaseFormat(short()[s.month()]),
  'month-number': (s) => s.month(),
  'month-ordinal': (s) => ordinal(s.month()),
  'month-pad': (s) => zeroPad(s.month()),
  'iso-month': (s) => zeroPad(s.month() + 1), //1-based months

  year: (s) => {
    let year = s.year()
    if (year > 0) {
      return year
    }
    year = Math.abs(year)
    return year + ' BC'
  },
  'year-short': (s) => {
    let year = s.year()
    if (year > 0) {
      return `'${String(s.year()).substr(2, 4)}`
    }
    year = Math.abs(year)
    return year + ' BC'
  },
  'iso-year': (s) => {
    let year = s.year()
    let isNegative = year < 0
    let str = zeroPad(Math.abs(year), 4) //0-padded
    if (isNegative) {
      //negative years are for some reason 6-digits ('-00008')
      str = zeroPad(str, 6)
      str = '-' + str
    }
    return str
  },

  time: (s) => s.time(),
  'time-24': (s) => `${s.hour24()}:${zeroPad(s.minute())}`,

  hour: (s) => s.hour12(),
  'hour-pad': (s) => zeroPad(s.hour12()),
  'hour-24': (s) => s.hour24(),
  'hour-24-pad': (s) => zeroPad(s.hour24()),

  minute: (s) => s.minute(),
  'minute-pad': (s) => zeroPad(s.minute()),
  second: (s) => s.second(),
  'second-pad': (s) => zeroPad(s.second()),
  millisecond: (s) => s.millisecond(),
  'millisecond-pad': (s) => zeroPad(s.millisecond(), 3),

  ampm: (s) => s.ampm(),
  AMPM: (s) => s.ampm().toUpperCase(),
  quarter: (s) => 'Q' + s.quarter(),
  season: (s) => s.season(),
  era: (s) => s.era(),
  json: (s) => s.json(),
  timezone: (s) => s.timezone().name,
  offset: (s) => isoOffset(s),

  numeric: (s) => `${s.year()}/${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`, // yyyy/mm/dd
  'numeric-us': (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
  'numeric-uk': (s) => `${zeroPad(s.date())}/${zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy
  'mm/dd': (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`, //mm/dd

  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: (s) => {
    let year = s.format('iso-year')
    let month = zeroPad(s.month() + 1) //1-based months
    let date = zeroPad(s.date())
    let hour = zeroPad(s.h24())
    let minute = zeroPad(s.minute())
    let second = zeroPad(s.second())
    let ms = zeroPad(s.millisecond(), 3)
    let offset = isoOffset(s)
    return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}` //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': (s) => {
    let month = zeroPad(s.month() + 1) //1-based months
    let date = zeroPad(s.date())
    let year = padYear(s.year())
    return `${year}-${month}-${date}` //2017-02-15
  },
  'iso-utc': (s) => {
    return new Date(s.epoch).toISOString() //2017-03-08T19:45:28.367Z
  },

  //i made these up
  nice: (s) => `${short()[s.month()]} ${ordinal(s.date())}, ${s.time()}`,
  'nice-24': (s) =>
    `${short()[s.month()]} ${ordinal(s.date())}, ${s.hour24()}:${zeroPad(
      s.minute()
    )}`,
  'nice-year': (s) => `${short()[s.month()]} ${ordinal(s.date())}, ${s.year()}`,
  'nice-day': (s) =>
    `${_short()[s.day()]} ${applyCaseFormat(short()[s.month()])} ${ordinal(
      s.date()
    )}`,
  'nice-full': (s) =>
    `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(s.date())}, ${s.time()}`,
  'nice-full-24': (s) =>
    `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(
      s.date()
    )}, ${s.hour24()}:${zeroPad(s.minute())}`
}
//aliases
const aliases = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  tz: 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'month-iso': 'iso-month',
  'year-iso': 'iso-year',
  'nice-short': 'nice',
  'nice-short-24': 'nice-24',
  mdy: 'numeric-us',
  dmy: 'numeric-uk',
  ymd: 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
}
Object.keys(aliases).forEach((k) => (format[k] = format[aliases[k]]))

const printFormat = (s, str = '') => {
  //don't print anything if it's an invalid date
  if (s.isValid() !== true) {
    return ''
  }
  //support .format('month')
  if (format.hasOwnProperty(str)) {
    let out = format[str](s) || ''
    if (str !== 'json') {
      out = String(out)
      if (str.toLowerCase() !== 'ampm') {
        out = applyCaseFormat(out)
      }
    }
    return out
  }
  //support '{hour}:{minute}' notation
  if (str.indexOf('{') !== -1) {
    let sections = /\{(.+?)\}/g
    str = str.replace(sections, (_, fmt) => {
      fmt = fmt.trim()
      if (fmt !== 'AMPM') {
        fmt = fmt.toLowerCase()
      }
      if (format.hasOwnProperty(fmt)) {
        let out = String(format[fmt](s))
        if (fmt.toLowerCase() !== 'ampm') {
          return applyCaseFormat(out)
        }
        return out
      }
      return ''
    })
    return str
  }

  return s.format('iso-short')
}
export default printFormat
