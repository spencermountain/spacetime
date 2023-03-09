import getDay from './compute/getDay.js'
import parse from './parse/index.js'
import parseTz from './parseTz.js'
import fallbackTz from './fallbackTz.js'
import getEpoch from './compute/getEpoch/index.js'
import yearStart from './compute/yearStart.js'


export default {
  // from https://www.timeanddate.com/date/leapyear.html
  isLeapYear: (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0),

  getDay: (cal) => getDay(cal.year, cal.month, cal.date),

  // parse input string into epoch
  parse,

  // determine timezone
  parseTz,
  fallbackTz,

  yearStart,
  getEpoch,
}