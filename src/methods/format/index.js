'use strict';
const fns = require('../../fns');
const months = require('../../data/months');
const days = require('../../data/days');
const isoOffset = require('./_offset');
const shortDay = days.short()
const shortMonth = months.short()

const format = {
  day: (s) => s.dayName(),
  'day-short': (s) => shortDay[s.day()],
  'day-number': (s) => s.day(),
  'day-ordinal': (s) => fns.ordinal(s.day()),
  'day-pad': (s) => fns.zeroPad(s.day()),

  date: (s) => s.date(),
  'date-ordinal': s => fns.ordinal(s.date()),
  'date-pad': s => fns.zeroPad(s.date()),

  month: (s) => s.monthName(),
  'month-short': (s) => shortMonth[s.month()],
  'month-number': (s) => s.month(),
  'month-ordinal': (s) => fns.ordinal(s.month()),
  'month-pad': (s) => fns.zeroPad(s.month()),

  year: (s) => s.year(),
  'year-short': (s) => `'${String(s.year()).substr(2, 4)}`,
  'year-ordinal': (s) => fns.ordinal(s.year()),

  time: (s) => s.time(),
  'time-24': (s) => `${s.hour()}:${fns.zeroPad(s.minute())}`,
  hour: (s) => s.hour(),
  'hour-24': (s) => s.hour24(),

  minute: (s) => s.minute(),
  'minute-pad': (s) => fns.zeroPad(s.minute()),
  second: (s) => s.second(),
  'second-pad': (s) => fns.zeroPad(s.second()),

  ampm: (s) => s.ampm(),
  quarter: (s) => 'Q' + s.quarter(),
  season: (s) => s.season(),
  era: (s) => s.era(),

  numeric: (s) => `${s.year()}/${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, // yyyy/mm/dd
  'numeric-us': (s) => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
  'numeric-uk': (s) => `${fns.zeroPad(s.date())}/${fns.zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy

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
  'nice': s => `${shortMonth[s.month()]} ${fns.ordinal(s.date())}, ${s.time()}`,
  'nice-year': s => `${shortMonth[s.month()]} ${fns.ordinal(s.date())}, ${s.year()}`,
  'nice-day': s => `${shortDay[s.day()]} ${shortMonth[s.month()]} ${fns.ordinal(s.date())}`,
  'nice-full': s => `${shortDay[s.day()]} ${shortMonth[s.month()]} ${fns.ordinal(s.date())} ${s.year()}, ${s.time()}`,

}
//aliases
format['day-name'] = format.day
format['month-name'] = format.month

const printFormat = (s, str) => {
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

  return ''
};
module.exports = printFormat;
