import walkTo from '../../methods/set/walk.js'
import { toCardinal } from '../../fns.js'
import { validate, parseTime, parseYear, parseMonth } from './_parsers.js'

export default [
  // =====
  //  d-m-y
  // =====
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[-/]([a-z]+)[\-/]?([0-9]{4})?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1] || '')
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, m[4])
      return s
    }
  },
  // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1])
      }
      if (!obj.month || validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, m[4])
      return s
    }
  },
  // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[. \-/]([a-z]+)[. \-/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        date: Number(m[1]),
        month: parseMonth(m[2]),
        year: Number(m[3])
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = s.startOf('day')
      s = parseTime(s, m[4])
      return s
    }
  }
]
