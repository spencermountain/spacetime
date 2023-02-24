import { parseTime, parseYear, parseMonth, parseOffset, parseDate } from './units/index.js'

export default [
  // =====
  //  y-m-d
  // =====
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-+:]+)?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[1]),
        month: parseInt(m[2], 10),
        date: parseDate(m[3])
      }
      obj.offset = parseOffset(m[5])
      obj = parseTime(m[4], obj)
      return obj
    }
  },
  //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[-/. ]([0-9]{1,2})[-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[1]),
        month: parseInt(m[2], 10),
        date: parseDate(m[3])
      }
      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseDate(m[2])
        obj.month = parseInt(m[3], 10)
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  },

  //text-month "2015-feb-25"
  {
    reg: /^([0-9]{4})[-/. ]([a-z]+)[-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[1]),
        month: parseMonth(m[2]),
        date: parseDate(m[3] || '')
      }
      obj = parseTime(m[4], obj)
      return obj
    }
  }
]
