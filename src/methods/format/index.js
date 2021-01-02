const fns = require('../../fns')
const months = require('../../data/months')
const days = require('../../data/days')
const caseFormat = require('../../data/caseFormat')
const isoOffset = require('./_offset')

const applyCaseFormat = (str) => {
  if (caseFormat.useTitleCase()) {
    return fns.titleCase(str)
  }
  return str

}

const format = {
  day: (s) => applyCaseFormat(s.dayName()),
  'day-short': (s) => applyCaseFormat(days.short()[s.day()]),
  'day-number': (s) => s.day(),
  'day-ordinal': (s) => fns.ordinal(s.day()),
  'day-pad': (s) => fns.zeroPad(s.day()),

  date: (s) => s.date(),
  'date-ordinal': (s) => fns.ordinal(s.date()),
  'date-pad': (s) => fns.zeroPad(s.date()),

  month: (s) => applyCaseFormat(s.monthName()),
  'month-short': (s) => applyCaseFormat(months.short()[s.month()]),
  'month-number': (s) => s.month(),
  'month-ordinal': (s) => fns.ordinal(s.month()),
  'month-pad': (s) => fns.zeroPad(s.month()),
  'iso-month': (s) => fns.zeroPad(s.month() + 1), //1-based months

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
    let str = fns.zeroPad(Math.abs(year), 4) //0-padded
    if (isNegative) {
      //negative years are for some reason 6-digits ('-00008')
      str = fns.zeroPad(str, 6)
      str = '-' + str
    }
    return str
  },

  time: (s) => s.time(),
  'time-24': (s) => `${s.hour24()}:${fns.zeroPad(s.minute())}`,

  hour: (s) => s.hour12(),
  'hour-pad': (s) => fns.zeroPad(s.hour12()),
  'hour-24': (s) => s.hour24(),
  'hour-24-pad': (s) => fns.zeroPad(s.hour24()),

  minute: (s) => s.minute(),
  'minute-pad': (s) => fns.zeroPad(s.minute()),
  second: (s) => s.second(),
  'second-pad': (s) => fns.zeroPad(s.second()),

  ampm: (s) => s.ampm(),
  quarter: (s) => 'Q' + s.quarter(),
  season: (s) => s.season(),
  era: (s) => s.era(),
  json: (s) => s.json(),
  timezone: (s) => s.timezone().name,
  offset: (s) => isoOffset(s),

  numeric: (s) => `${s.year()}/${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, // yyyy/mm/dd
  'numeric-us': (s) => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
  'numeric-uk': (s) => `${fns.zeroPad(s.date())}/${fns.zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy
  'mm/dd': (s) => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, //mm/dd

  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: (s) => {
    let year = s.format('iso-year')
    let month = fns.zeroPad(s.month() + 1) //1-based months
    let date = fns.zeroPad(s.date())
    let hour = fns.zeroPad(s.h24())
    let minute = fns.zeroPad(s.minute())
    let second = fns.zeroPad(s.second())
    let ms = fns.zeroPad(s.millisecond(), 3)
    let offset = isoOffset(s)
    return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}` //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': (s) => {
    let month = fns.zeroPad(s.month() + 1) //1-based months
    let date = fns.zeroPad(s.date())
    return `${s.year()}-${month}-${date}` //2017-02-15
  },
  'iso-utc': (s) => {
    return new Date(s.epoch).toISOString() //2017-03-08T19:45:28.367Z
  },

  //i made these up
  nice: (s) => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.time()}`,
  'nice-24': (s) => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.hour24()}:${fns.zeroPad(s.minute())}`,
  'nice-year': (s) => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.year()}`,
  'nice-day': (s) =>
    `${days.short()[s.day()]} ${applyCaseFormat(months.short()[s.month()])} ${fns.ordinal(s.date())}`,
  'nice-full': (s) =>
    `${s.dayName()} ${applyCaseFormat(s.monthName())} ${fns.ordinal(s.date())}, ${s.time()}`,
  'nice-full-24': (s) =>
    `${s.dayName()} ${applyCaseFormat(s.monthName())} ${fns.ordinal(s.date())}, ${s.hour24()}:${fns.zeroPad(s.minute())}`
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
      if (str !== 'ampm') {
        out = applyCaseFormat(out)
      }
    }
    return out
  }
  //support '{hour}:{minute}' notation
  if (str.indexOf('{') !== -1) {
    let sections = /\{(.+?)\}/g
    str = str.replace(sections, (_, fmt) => {
      fmt = fmt.toLowerCase().trim()
      if (format.hasOwnProperty(fmt)) {
        let out = String(format[fmt](s))
        if (fmt !== 'ampm') {
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
module.exports = printFormat
