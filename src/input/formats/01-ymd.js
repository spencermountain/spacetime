import walkTo from '../../methods/set/walk.js'
import { toCardinal } from '../../fns.js'
import { validate, parseTime, parseYear, parseMonth, parseOffset } from './_parsers.js'

export default [
  // =====
  //  y-m-d
  // =====
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9-+:]+)?$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: m[3]
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      parseOffset(s, m[5])
      walkTo(s, obj)
      s = parseTime(s, m[4])
      return s
    }
  },
  //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[\-/. ]([0-9]{1,2})[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: parseInt(m[3], 10)
      }
      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(m[2], 10)
        obj.month = parseInt(m[3], 10) - 1
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

  //text-month "2015-feb-25"
  {
    reg: /^([0-9]{4})[\-/. ]([a-z]+)[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear(m[1], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[3] || '')
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, m[4])
      return s
    }
  }
]
