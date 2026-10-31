import { validate, parseYear, parseMonth, clampDate, type Parser } from './_parsers.ts'

// =====
// no dates
// =====
const parsers: Parser[] = [
  // '2012-06' month-only
  {
    reg: /^([0-9]{4})[\-/]([0-9]{2})$/,
    parse: (m) => {
      const parts = {
        year: Number(m[1]),
        month: parseInt(m[2], 10) - 1,
        date: 1
      }
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: '' }
    }
  },

  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (arr, s) => {
      const parts = {
        year: parseYear(arr[2], s._today),
        month: parseMonth(arr[1]),
        date: s._today.date || 1
      }
      parts.date = clampDate(parts)
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: '' }
    }
  },

  {
    // 'q2 2002'
    reg: /^(q[1-4])( of)?( [0-9]{4})?$/i,
    parse: (arr) => {
      const year = (arr[3] || '').trim()
      return { quarter: arr[1] || '', parts: year ? { year: Number(year) } : undefined }
    }
  },
  {
    // 'summer 2002'
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?$/i,
    parse: (arr) => {
      const year = (arr[3] || '').trim()
      return { season: arr[1] || '', parts: year ? { year: Number(year) } : undefined }
    }
  },
  {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (arr) => {
      let str = arr[0] || ''
      //make year-negative
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1')
      const d = new Date()
      const parts = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      }
      parts.date = clampDate(parts)
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: '' }
    }
  },
  {
    // '200ad'
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: (arr) => {
      let str = arr[0] || ''
      //remove commas
      str = str.replace(/,/g, '')
      const d = new Date()
      const parts = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      }
      parts.date = clampDate(parts)
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: '' }
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (arr, s) => {
      const today = s._today
      const d = new Date()
      const parts = {
        year: parseYear(arr[0], today),
        month: today.month || d.getMonth(),
        // using today's date, but a new month is awkward.
        date: today.date || (today.month ? 1 : d.getDate())
      }
      parts.date = clampDate(parts)
      if (validate(parts) === false) {
        return null
      }
      return { parts, time: '' }
    }
  }
]

export default parsers
