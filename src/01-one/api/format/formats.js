import { titleCase, zeroPad, ordinal } from './_lib.js'
// import g from '../getter/index.js'

const fmt = {

  day: (s) => titleCase(s.dayName()),
  'day-short': (s) => titleCase(s.world.model.days[s.day()].shortForm),
  'day-number': (s) => s.day(),
  'day-ordinal': (s) => ordinal(s.day()),
  date: (_, cal) => cal.date,
  'date-ordinal': (_, cal) => ordinal(cal.date),
  month: (s) => s.monthName(),
  'month-short': (s) => s.monthName(),//titleCase(s.world.model.months[s.month()].shortForm),
  'month-number': (_, cal) => cal.month,
  'month-ordinal': (_, cal) => ordinal(cal.month),
  'iso-month': (_, cal) => zeroPad(cal.month),
  year: (_, cal) => {
    let y = cal.year
    return y > 0 ? y : `${Math.abs(y)} BC`
  },
  'year-short': (_, cal) => {
    let y = cal.year
    return y > 0 ? `'${String(y).substring(2, 4)}` : Math.abs(y) + ' BC'
  },
  'iso-year': (_, cal) => {
    let y = cal.year
    let str = zeroPad(Math.abs(y), 4) //0-padded
    if (y < 0) {
      str = '-' + zeroPad(str, 6)  //negative years are for some reason 6-digits ('-00008')
    }
    return str
  },

  // time: (s) => s.time(),
  'time-24': (s) => `${zeroPad(s.hour24())}:${zeroPad(s.minute())}`,

  hour: (s) => s.hour12(),
  'hour-24': (_, cal) => cal.hour,
  minute: (_, cal) => cal.minute,
  second: (_, cal) => cal.second,
  ms: (_, cal) => cal.millisecond,
  millisecond: (_, cal) => cal.millisecond,
  'millisecond-pad': (_, cal) => zeroPad(cal.millisecond, 3),

  ampm: (s) => s.ampm(),
  AMPM: (s) => s.ampm().toUpperCase(),
  quarter: (s) => 'Q' + s.quarter(),

  // turn timezone 5.25 into '+05:15'
  offset: (s, cal) => {
    let n = cal.offset || s.offset() || 0
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
fmt['iso-short'] = (s, cal) => `${fmt['iso-year'](s, cal)}-${zeroPad(cal.month)}-${zeroPad(cal.date)}`
fmt['iso-medium'] = (s, cal) => `${fmt['iso-short'](s, cal)}T${zeroPad(cal.hour)}:${zeroPad(cal.minute)}:${zeroPad(cal.second)}.${zeroPad(cal.millisecond, 3)}`
fmt['iso'] = (s, cal) => `${fmt['iso-medium'](s, cal)}${fmt.offset(s, cal)}`
//i made these up
fmt['nice'] = (s, cal) => `${fmt['month-short'](s, cal)} ${fmt['date-ordinal'](s, cal)}, ${s.time()}`
fmt['nice-day'] = (s, cal) => `${fmt['day-short'](s, cal)} ${fmt['month-short'](s, cal)} ${fmt['date-ordinal'](s, cal)}`

// aliases
const aliases = {
  'hour-12': 'hour',
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
let pads = ['day', 'date', 'month', 'hour', 'minute', 'second', 'hour-24', 'hour-12']
pads.forEach(k => {
  fmt[k + '-pad'] = (c) => zeroPad(fmt[k](c))
})
Object.keys(aliases).forEach((k) => {
  fmt[k] = fmt[aliases[k]]
})

export default fmt