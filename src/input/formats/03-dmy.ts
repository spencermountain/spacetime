import { toCardinal } from '../../fns.ts'
import { validate, parseYear, parseMonth, type Parser } from './_parsers.ts'

// =====
//  d-m-y
// =====
const parsers: Parser[] = [
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[-/]([a-z]+)[\-/]?([0-9]{4})?$/i,
    parse: (m, s) => {
      const parts = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1] || '')
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: '' }
    }
  },
  // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (m, s) => {
      const parts = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1])
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: m[4] || '' }
    }
  },
  // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[. \-/]([a-z]+)[. \-/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m) => {
      const parts = {
        date: Number(m[1]),
        month: parseMonth(m[2]),
        year: Number(m[3])
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: m[4] || '' }
    }
  }
]

export default parsers
