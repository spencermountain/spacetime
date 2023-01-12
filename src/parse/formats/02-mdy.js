import { parseTime, parseYear, parseMonth, parseDate } from './units/index.js'

export default [
  // =====
  //  m-d-y
  // =====
  //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[-/.]([0-9]{1,2})[-/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (m) => {
      let month = parseInt(m[1], 10)
      let date = parseDate(m[2])
      //support dd/mm/yyy
      // if (s.british || month >= 12) {
      //   date = parseInt(m[1], 10)
      //   month = parseInt(m[2], 10) - 1
      // }
      let obj = {
        date,
        month,
        year: parseYear(m[3])
      }
      // s = parseTime(s, m[4])
      return obj
    }
  },
  //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[3]),
        month: parseMonth(m[1]),
        date: parseDate(m[2] || '')
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  },

  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[3]),
        month: parseMonth(m[1]),
        date: parseDate(m[2] || '')
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  },
  // 'Sun Mar 14 15:09:48 +0000 2021'
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[5]),
        month: parseMonth(m[1]),
        date: parseDate(m[2] || '')
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  }
]
