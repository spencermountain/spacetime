import { toCardinal } from '../../fns.ts'
import { validate, parseYear, parseMonth, parseTz, type Parser } from './_parsers.ts'

// =====
//  y-m-d
// =====
const parsers: Parser[] = [
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  // optionally supports Temporal fmt w/ [IANA]
  {
    // offset must start with 'Z' or a sign, so it shares no leading char with
    // the preceding time group ([0-9.:]+) -> no ambiguous split -> linear match.
    reg: /^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T ]([0-9.:]+)(Z|[+-][0-9:]+)?(\[[^[\]]*\])?(\[[^[\]]*\])?$/i,
    parse: (m) => {
      const parts = {
        year: Number(m[1]),
        month: parseInt(m[2], 10) - 1,
        date: Number(m[3])
      }
      if (validate(parts) === false) {
        return null
      }
      // an iana code in brackets at the end wins over the offset
      // (for now, ignore Temporal calendar info in m[7]..)
      const timezone = m[6] ? parseTz(m[6]) : ''
      return timezone ? { parts, timezone, time: m[4] } : { parts, offset: m[5], time: m[4] }
    }
  },
  //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[\-/. ]([0-9]{1,2})[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m) => {
      const parts = {
        year: Number(m[1]),
        month: parseInt(m[2], 10) - 1,
        date: parseInt(m[3], 10)
      }
      if (parts.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        parts.date = parseInt(m[2], 10)
        parts.month = parseInt(m[3], 10) - 1
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: m[4] || '' }
    }
  },

  //text-month "2015-feb-25"
  {
    reg: /^([0-9]{4})[\-/. ]([a-z]+)[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (m, s) => {
      const parts = {
        year: parseYear(m[1], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[3] || '')
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: m[4] || '' }
    }
  }
]

export default parsers
