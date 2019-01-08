'use strict';
const fns = require('../../fns');
const months = require('../../data/months');
const days = require('../../data/days');
const isoOffset = require('./_offset');

const format = {
  day: (s) => fns.titleCase(s.dayName()),
  'day-short': (s) => fns.titleCase(days.short()[s.day()]),
  'day-number': (s) => s.day(),
  'day-ordinal': (s) => fns.ordinal(s.day()),
  'day-pad': (s) => fns.zeroPad(s.day()),

  date: (s) => s.date(),
  'date-ordinal': s => fns.ordinal(s.date()),
  'date-pad': s => fns.zeroPad(s.date()),

  month: (s) => fns.titleCase(s.monthName()),
  'month-short': (s) => fns.titleCase(months.short()[s.month()]),
  'month-number': (s) => s.month(),
  'month-ordinal': (s) => fns.ordinal(s.month()),
  'month-pad': (s) => fns.zeroPad(s.month()),

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

  time: (s) => s.time(),
  'time-24': (s) => `${s.hour24()}:${fns.zeroPad(s.minute())}`,
  hour: (s) => s.hour12(),
  'hour-24': (s) => s.hour24(),

  minute: (s) => s.minute(),
  'minute-pad': (s) => fns.zeroPad(s.minute()),
  second: (s) => s.second(),
  'second-pad': (s) => fns.zeroPad(s.second()),

  ampm: (s) => s.ampm(),
  quarter: (s) => 'Q' + s.quarter(),
  season: (s) => s.season(),
  era: (s) => s.era(),
  timezone: (s) => s.timezone().name,
  offset: (s) => isoOffset(s),

  numeric: (s) => `${s.year()}/${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, // yyyy/mm/dd
  'numeric-us': (s) => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
  'numeric-uk': (s) => `${fns.zeroPad(s.date())}/${fns.zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy
  'mm/dd': (s) => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, //mm/dd

  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: s => {
    let month = fns.zeroPad(s.month() + 1); //1-based months
    let date = fns.zeroPad(s.date());
    let hour = fns.zeroPad(s.h24());
    let minute = fns.zeroPad(s.minute());
    let second = fns.zeroPad(s.second());
    let ms = fns.zeroPad(s.millisecond(), 3);
    let offset = isoOffset(s)
    return `${s.year()}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}`; //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': s => {
    let month = fns.zeroPad(s.month() + 1); //1-based months
    let date = fns.zeroPad(s.date());
    return `${s.year()}-${month}-${date}`; //2017-02-15
  },
  'iso-utc': s => {
    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
  },

  //i made these up
  'nice': s => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.time()}`,
  'nice-year': s => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.year()}`,
  'nice-day': s => `${days.short()[s.day()]} ${fns.titleCase(months.short()[s.month()])} ${fns.ordinal(s.date())}`,
  'nice-full': s => `${s.dayName()} ${fns.titleCase(s.monthName())} ${fns.ordinal(s.date())}, ${s.time()}`

}
//aliases
const aliases = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  'tz': 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'nice-short': 'nice',
  'mdy': 'numeric-us',
  'dmy': 'numeric-uk',
  'ymd': 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
}
Object.keys(aliases).forEach((k) => format[k] = format[aliases[k]])

const printFormat = (s, str = '') => {
  //don't print anything if it's an invalid date
  if (s.isValid() !== true) {
    return '';
  }
  //support .format('month')
  if (format.hasOwnProperty(str)) {
    let out = String(format[str](s) || '')
    if (str !== 'ampm') {
      out = fns.titleCase(out);
    }
    return out
  }
  //support '{hour}:{minute}' notation
  if (str.indexOf('{') !== -1) {
    let sections = /\{(.+?)\}/g
    str = str.replace(sections, (_, fmt) => {
      fmt = fmt.toLowerCase().trim()
      if (format.hasOwnProperty(fmt)) {
        return String(format[fmt](s) || '')
      }
      return ''
    })
    return str
  }

  return s.format('iso-short')
};
module.exports = printFormat;
