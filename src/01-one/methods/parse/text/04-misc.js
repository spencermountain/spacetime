import { parseYear, parseMonth, parseTime, parseQuarter } from './units/index.js'

export default [
  // '2012-06' month-only
  {
    reg: /^([0-9]{4})[-/]([0-9]{2})$/,
    parse: (m) => {
      let obj = {
        year: parseYear(m[1]),
        month: parseInt(m[2], 10),
      }
      return obj
    }
  },

  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[2]),
        month: parseMonth(m[1]),
      }
      return obj
    }
  },

  {
    // 'q2 2002'
    reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
    parse: (m) => {
      let q = parseQuarter(m[1] || '')
      if (q && q > 0 && q < 5) {
        return {
          year: parseYear(m[3]),
          month: (q - 1) * 3
        }
      }
      return {}
    }
  },
  {
    // 'summer 2002'
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
    parse: (m) => {
      let season = m[1] || ''
      // TODO: 
      if (m[3]) {
        let year = parseYear(m[3])
        return { year }
      }
      return {}
    }
  },
  {
    // '3:00pm'
    reg: /^[0-9:]+(a\.?m\.?|p\.?m\.?)?$/i,
    parse: (m) => {
      let str = m[0] || ''
      let obj = parseTime(str.trim())
      if (obj.hour || obj.hour === 0) {
        return obj
      }
      return null
    }
  },
  {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (m) => {
      let str = m[0] || ''
      //make year-negative
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1').trim()
      let obj = {
        year: parseInt(str.trim(), 10),
      }
      return obj
    }
  },
  {
    // '200ad'
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: (m) => {
      let str = m[0] || ''
      let obj = {
        year: parseInt(str.trim(), 10),
      }
      return obj
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (m) => {
      let obj = {
        year: parseYear(m[0]),
      }
      return obj
    }
  }
]
