import { parseYear, parseMonth } from './units/index.js'

export default [
  // =====
  // no dates
  // =====

  // '2012-06' month-only
  {
    reg: /^([0-9]{4})[-/]([0-9]{2})$/,
    parse: (m) => {
      let obj = {
        year: parseYear(m[1]),
        month: parseInt(m[2], 10),
      }
      // s = parseTime(s, m[4])
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
      // s = parseTime(s, m[4])
      return obj
    }
  },

  {
    // 'q2 2002'
    reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
    parse: (m) => {
      let quarter = m[1] || ''
      // TODO: 
      // s = s.quarter(quarter)
      if (m[3]) {
        let year = parseYear(m[3])
        return { year }
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
      // s = s.season(season)
      if (m[3]) {
        let year = parseYear(m[3])
        return { year }
      }
      return {}
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
      //remove commas
      str = str.replace(/,/g, '')
      let obj = {
        year: parseInt(str.trim(), 10),
      }
      // s = parseTime(s)
      return obj
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (m) => {
      // TODO: 
      // let today = s._today
      // using today's date, but a new month is awkward.
      // if (today.month && !today.date) {
      //   today.date = 1
      // }
      let obj = {
        year: parseYear(m[0]),
        // month: today.month || d.getMonth(),
        // date: today.date || d.getDate()
      }
      // s = parseTime(s)
      return obj
    }
  }
]
