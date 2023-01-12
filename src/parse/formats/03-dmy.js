import { parseTime, parseYear, parseMonth, parseDate } from './units/index.js'

export default [
  // =====
  //  d-m-y
  // =====
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[-/]([a-z]+)[-/]?([0-9]{4})?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[3]),
        month: parseMonth(m[2]),
        date: parseDate(m[1] || '')
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  },
  // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[3]),
        month: parseMonth(m[2]),
        date: parseDate(m[1])
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  },
  // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[ /]([a-z]+)[ /]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m) => {
      let obj = {
        date: parseDate(m[1]),
        month: parseMonth(m[2]),
        year: parseYear(m[3])
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  }
]
