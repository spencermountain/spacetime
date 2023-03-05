import { titleCase, zeroPad, ordinal } from './_lib.js'
import g from '../getter/index.js'
import world from '../../../world.js'
let { days, months } = world.config

const fmt = {

  day: (c) => titleCase(g.dayName(c)),
  'day-short': (c) => titleCase(days.shortForm[g.day(c)]),
  'day-number': (c) => g.day(c),
  'day-ordinal': (c) => ordinal(g.day(c)),
  'day-pad': (c) => zeroPad(g.day(c)),

  date: (c) => c.date,
  'date-ordinal': (c) => ordinal(c.date),
  'date-pad': (c) => zeroPad(c.date),

  month: (c) => titleCase(g.monthName(c)),
  'month-short': (c) => titleCase(months.shortForm[c.month - 1]),
  'month-number': (c) => c.month,
  'month-ordinal': (c) => ordinal(c.month),
  'month-pad': (c) => zeroPad(c.month),
  'iso-month': (c) => zeroPad(c.month + 1), //1-based months

  year: (c) => c.year > 0 ? c.year : `${Math.abs(c.year)} BC`,
  'year-short': (c) => c.year > 0 ? `'${String(c.year).substring(2, 4)}` : Math.abs(c.year) + ' BC',
  'iso-year': (c) => {
    let str = zeroPad(Math.abs(c.year), 4) //0-padded
    if (c.year < 0) {
      str = '-' + zeroPad(str, 6)  //negative years are for some reason 6-digits ('-00008')
    }
    return str
  },

  time: (c) => `${g.hour12(c)}:${zeroPad(c.minute)}${g.ampm(c)}`,
  'time-24': (c) => `${zeroPad(c.hour)}:${zeroPad(c.minute)}`,

  hour: (c) => g.hour12(c),
  'hour-pad': (c) => zeroPad(g.hour12(c)),
  'hour-24': (c) => c.hour,
  'hour-24-pad': (c) => zeroPad(c.hour),

  minute: (c) => c.minute,
  'minute-pad': (c) => zeroPad(c.minute),
  second: (c) => c.second,
  'second-pad': (c) => zeroPad(c.second),
  ms: (c) => c.millisecond,
  millisecond: (c) => c.millisecond,
  'millisecond-pad': (c) => zeroPad(c.millisecond, 3),

  ampm: (c) => g.ampm(c),
  AMPM: (c) => g.ampm(c).toUpperCase(),
  quarter: (c) => 'Q' + g.quarter(c),

  // turn timezone 5.25 into '+05:15'
  offset: (c) => {
    let n = c.offset || 0
    if (n === 0) {
      return 'Z'
    }
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
// compound ones
fmt['iso-short'] = (c) => `${fmt['iso-year'](c)}-${zeroPad(c.month)}-${zeroPad(c.date)}`
fmt['iso-medium'] = (c) => `${fmt['iso-short'](c)}T${zeroPad(c.hour)}:${zeroPad(c.minute)}:${zeroPad(c.second)}.${zeroPad(c.millisecond, 3)}`
fmt['iso'] = (c) => `${fmt['iso-medium'](c)}${fmt.offset(c)}`
//i made these up
fmt['nice'] = (c) => `${fmt['month-short'](c)} ${fmt['date-ordinal'](c)}, ${fmt['time'](c)}`
fmt['nice-day'] = (c) => `${fmt['day-short'](c)} ${fmt['month-short'](c)} ${fmt['date-ordinal'](c)}`


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
  // 'nice-day': '{day-short} {month-short} {date-ordinal}'
}
Object.keys(aliases).forEach((k) => (fmt[k] = fmt[aliases[k]]))

export default fmt