import { toCardinal } from '../../fns.ts'
import { validate, parseYear, parseMonth, type Parser } from './_parsers.ts'

// =====
//  m-d-y
// =====
const parsers: Parser[] = [
  //mm/dd/yyyy or mm/dd/yy - "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[-/.]([0-9]{1,2})(?:[\-/.]([0-9]{4}|[0-9]{2}))?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (arr, s) => {
      let month = parseInt(arr[1], 10) - 1
      let date = parseInt(arr[2], 10)
      //support dd/mm/yyy
      if (s.british || month >= 12) {
        date = parseInt(arr[1], 10)
        month = parseInt(arr[2], 10) - 1
      }
      const parts = {
        date,
        month,
        year: parseYear(arr[3], s._today) || new Date().getFullYear()
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: arr[4] || '' }
    }
  },
  //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (arr, s) => {
      const parts = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || '')
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: arr[4] || '' }
    }
  },

  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (arr, s) => {
      const parts = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || '')
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: arr[4] || '' }
    }
  },
  // 'Sun Mar 14 15:09:48 +0000 2021'
  {
    reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2})( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (arr, s) => {
      const [, month, date, time, offset, year] = arr
      const parts = {
        year: parseYear(year, s._today),
        month: parseMonth(month),
        date: toCardinal(date || '')
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, offset, time }
    }
  },
  // Date.toString() - 'Mon Jun 17 2019 11:00:00 GMT-0700 (Pacific Daylight Time)'
  // (the weekday is already stripped by normalize)
  {
    reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{4}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}) (?:gmt)?([+-][0-9]{4})/i,
    parse: (arr, s) => {
      const [, month, date, year, time, offset] = arr
      const parts = {
        year: parseYear(year, s._today),
        month: parseMonth(month),
        date: toCardinal(date || '')
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, offset, time }
    }
  }
]

export default parsers
