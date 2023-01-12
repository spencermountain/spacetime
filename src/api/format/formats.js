import { titleCase, zeroPad, ordinal } from './_fns.js'
import config from '../../config.js'


const fmt = {

  // day: (c) => titleCase(s.dayName()),
  // 'day-short': (c) => titleCase(_short()[s.day()]),
  // 'day-number': (c) => s.day(),
  // 'day-ordinal': (c) => ordinal(s.day()),
  // 'day-pad': (c) => zeroPad(s.day()),

  date: (c) => c.date,
  'date-ordinal': (c) => ordinal(c.date),
  'date-pad': (c) => zeroPad(c.date),

  // month: (c) => titleCase(c.monthName()),
  // 'month-short': (c) => titleCase(short()[c.month]),
  'month-number': (c) => c.month,
  'month-ordinal': (c) => ordinal(c.month),
  'month-pad': (c) => zeroPad(c.month),
  'iso-month': (c) => zeroPad(c.month + 1), //1-based months
  'iso-short': (c) => `${c.year}-${zeroPad(c.month)}-${zeroPad(c.date)}`,
  'iso-medium': (c) => `${fmt['iso-year'](c)}-${zeroPad(c.month)}-${zeroPad(c.date)}T${zeroPad(c.hour)}:${zeroPad(c.minute)}:${zeroPad(c.second)}.${zeroPad(c.ms, 3)}`,
  'iso': (c) => `${fmt['iso-medium'](c)}${fmt.offset(c)}`,

  year: (c) => c.year > 0 ? c.year : `${Math.abs(c.year)} BC`,
  'year-short': (c) => {
    let y = c.year
    if (y > 0) {
      return `'${String(y).substr(2, 4)}`
    }
    return Math.abs(y) + ' BC'
  },
  'iso-year': (c) => {
    let str = zeroPad(Math.abs(c.year), 4) //0-padded
    if (c.year < 0) {
      str = '-' + zeroPad(str, 6)  //negative years are for some reason 6-digits ('-00008')
    }
    return str
  },

  time: (c) => c.time(),
  'time-24': (c) => `${c.hour}:${zeroPad(c.minute)}`,

  hour: (c) => c.hour % 12,
  'hour-pad': (c) => zeroPad(c.hour % 12),
  'hour-24': (c) => c.hour,
  'hour-24-pad': (c) => zeroPad(c.hour),

  minute: (c) => c.minute,
  'minute-pad': (c) => zeroPad(c.minute),
  second: (c) => c.second,
  'second-pad': (c) => zeroPad(c.second),
  ms: (c) => c.ms,
  millisecond: (c) => c.ms,
  'millisecond-pad': (c) => zeroPad(c.ms, 3),

  ampm: (c) => c.hour < 12 ? 'am' : 'pm',
  AMPM: (c) => c.hour < 12 ? 'AM' : 'PM',
  quarter: (c) => {
    if (c.month < 3) {
      return 'Q1'
    } else if (c.month < 6) {
      return 'Q2'
    } else if (c.month < 9) {
      return 'Q3'
    }
    return 'Q4'
  },
  // turn timezone 5.25 into '+05:15'
  offset: (c) => {
    let n = c.offset || 0
    let out = n <= 0 ? '-' : '+'
    n = Math.abs(n)
    // add hour
    let h = parseInt(n, 10)
    out += String(h).padStart(2, '0')
    // add minute
    let decimal = n % 1
    if (decimal) {
      let min = decimal * 60
      out += ':' + String(min).padStart(2, '0')
    } else {
      out += ':00'
    }
    return out
  }
}
// aliases
const aliases = {
  'hour-12': 'hour',
  'hour-12-pad': 'hour-pad',
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
  'day-nice': 'nice-day',
}
Object.keys(aliases).forEach((k) => (fmt[k] = fmt[aliases[k]]))

export default fmt