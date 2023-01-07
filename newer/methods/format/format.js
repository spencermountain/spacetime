import { titleCase, zeroPad, ordinal } from './_fns.js'

const fns = {

  // day: (c) => titleCase(s.dayName()),
  // 'day-short': (c) => titleCase(_short()[s.day()]),
  // 'day-number': (c) => s.day(),
  // 'day-ordinal': (c) => ordinal(s.day()),
  // 'day-pad': (c) => zeroPad(s.day()),

  date: (c) => c.date,
  'date-ordinal': (c) => ordinal(c.date),
  'date-pad': (c) => zeroPad(c.date),

  // month: (c) => titleCase(c.monthName()),
  'month-short': (c) => titleCase(short()[c.month]),
  'month-number': (c) => c.month,
  'month-ordinal': (c) => ordinal(c.month),
  'month-pad': (c) => zeroPad(c.month),
  'iso-month': (c) => zeroPad(c.month + 1), //1-based months

  year: (c) => {
    let y = c.year
    return y > 0 ? y : `${Math.abs(y)} BC`
  },
  'year-short': (c) => {
    let year = c.year
    if (year > 0) {
      return `'${String(c.year).substr(2, 4)}`
    }
    year = Math.abs(year)
    return year + ' BC'
  },
  'iso-year': (c) => {
    let year = c.year
    let isNegative = year < 0
    let str = zeroPad(Math.abs(year), 4) //0-padded
    if (isNegative) {
      //negative years are for some reason 6-digits ('-00008')
      str = zeroPad(str, 6)
      str = '-' + str
    }
    return str
  },

  time: (c) => c.time(),
  'time-24': (c) => `${c.hour}:${zeroPad(c.minute)}`,

  // hour: (c) => c.hour12,
  // 'hour-pad': (c) => zeroPad(c.hour12()),
  'hour-24': (c) => c.hour,
  'hour-24-pad': (c) => zeroPad(c.hour),

  minute: (c) => c.minute,
  'minute-pad': (c) => zeroPad(c.minute),
  second: (c) => c.second,
  'second-pad': (c) => zeroPad(c.second),
  ms: (c) => c.ms,
  millisecond: (c) => c.ms,
  'millisecond-pad': (c) => zeroPad(c.ms, 3),
}

const format = function (cal, str) {
  let sections = /\{(.+?)\}/g
  str = str.replace(sections, (_, name) => {
    name = name.toLowerCase().trim()
    if (fns.hasOwnProperty(name)) {
      return fns[name](cal)
    }
    return `{${name}}`
  })
  return str
}
export default format