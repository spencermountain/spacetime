import walkTo from '../../methods/set/walk.js'
import { toCardinal } from '../../fns.js'
import { validate, parseTime, parseYear, parseMonth, parseOffset } from './_parsers.js'

export default [
  // =====
  //  m-d-y
  // =====
  //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[-/.]([0-9]{1,2})[\-/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1
      let date = parseInt(arr[2], 10)
      //support dd/mm/yyy
      if (s.british || month >= 12) {
        date = parseInt(arr[1], 10)
        month = parseInt(arr[2], 10) - 1
      }
      let obj = {
        date,
        month,
        year: parseYear(arr[3], s._today) || new Date().getFullYear()
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || '')
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },

  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || '')
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  // 'Sun Mar 14 15:09:48 +0000 2021'
  {
    reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2})( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let [, month, date, time, tz, year] = arr
      let obj = {
        year: parseYear(year, s._today),
        month: parseMonth(month),
        date: toCardinal(date || '')
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseOffset(s, tz)
      s = parseTime(s, time)
      return s
    }
  }
]
