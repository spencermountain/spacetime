import { titleCase, zeroPad, ordinal } from './_lib.js'
// import g from '../getter/index.js'

const fmt = {

  day: (s) => titleCase(s.dayName()),
  'day-short': (s) => titleCase(s.world.model.days[s.day()].shortForm),
  'day-number': (s) => s.day(),
  'day-ordinal': (s) => ordinal(s.day()),
  date: (s) => s.date(),
  'date-ordinal': (s) => ordinal(s.date()),
  month: (s) => titleCase(s.monthName()),
  'month-short': (s) => s.monthName(),//titleCase(s.world.model.months[s.month()].shortForm),
  'month-number': (s) => s.month(),
  'month-ordinal': (s) => ordinal(s.month()),
  'iso-month': (s) => zeroPad(s.month() + 1), //1-based months
  year: (s) => {
    let y = s.year()
    return y > 0 ? y : `${Math.abs(y)} BC`
  },
  'year-short': (s) => {
    let y = s.year()
    return y > 0 ? `'${String(y).substring(2, 4)}` : Math.abs(y) + ' BC'
  },
  'iso-year': (s) => {
    let y = s.year()
    let str = zeroPad(Math.abs(y), 4) //0-padded
    if (y < 0) {
      str = '-' + zeroPad(str, 6)  //negative years are for some reason 6-digits ('-00008')
    }
    return str
  },

  // time: (s) => s.time(),
  'time-24': (s) => `${zeroPad(s.hour24())}:${zeroPad(s.minute())}`,

  hour: (s) => s.hour12(),
  'hour-24': (s) => s.hour24(),
  minute: (s) => s.minute(),
  second: (s) => s.second(),
  ms: (s) => s.millisecond(),
  millisecond: (s) => s.millisecond(),
  'millisecond-pad': (s) => zeroPad(s.millisecond(), 3),

  ampm: (s) => s.ampm(),
  AMPM: (s) => s.ampm().toUpperCase(),
  quarter: (s) => 'Q' + s.quarter(),

  // turn timezone 5.25 into '+05:15'
  offset: (s) => {
    let n = s.offset() || 0
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
fmt['iso-short'] = (s) => `${fmt['iso-year'](s)}-${fmt['iso-month'](s)}-${zeroPad(s.date())}`
fmt['iso-medium'] = (s) => `${fmt['iso-short'](s)}T${zeroPad(s.hour())}:${zeroPad(s.minute())}:${zeroPad(s.second())}.${zeroPad(s.millisecond(), 3)}`
fmt['iso'] = (c) => `${fmt['iso-medium'](c)}${fmt.offset(c)}`
//i made these up
fmt['nice'] = (s) => `${fmt['month-short'](s)} ${fmt['date-ordinal'](s)}, ${s.time()}`
fmt['nice-day'] = (s) => `${fmt['day-short'](s)} ${fmt['month-short'](s)} ${fmt['date-ordinal'](s)}`

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
Object.keys(aliases).forEach((k) => (fmt[k] = fmt[aliases[k]]))

export default fmt