import walkTo from '../../methods/set/walk.js'
import { validate, parseTime, parseYear, parseMonth } from './_parsers.js'

export default [
  // =====
  // no dates
  // =====

  // '2012-06' month-only
  {
    reg: /^([0-9]{4})[\-/]([0-9]{2})$/,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: 1
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

  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[2], s._today),
        month: parseMonth(arr[1]),
        date: s._today.date || 1
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },

  {
    // 'q2 2002'
    reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
    parse: (s, arr) => {
      let quarter = arr[1] || ''
      s = s.quarter(quarter)
      let year = arr[3] || ''
      if (year) {
        year = year.trim()
        s = s.year(year)
      }
      return s
    }
  },
  {
    // 'summer 2002'
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
    parse: (s, arr) => {
      let season = arr[1] || ''
      s = s.season(season)
      let year = arr[3] || ''
      if (year) {
        year = year.trim()
        s = s.year(year)
      }
      return s
    }
  },
  {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || ''
      //make year-negative
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1')
      let d = new Date()
      let obj = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s)
      return s
    }
  },
  {
    // '200ad'
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: (s, arr) => {
      let str = arr[0] || ''
      //remove commas
      str = str.replace(/,/g, '')
      let d = new Date()
      let obj = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s)
      return s
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (s, arr) => {
      let today = s._today
      // using today's date, but a new month is awkward.
      if (today.month && !today.date) {
        today.date = 1
      }
      let d = new Date()
      let obj = {
        year: parseYear(arr[0], today),
        month: today.month || d.getMonth(),
        date: today.date || d.getDate()
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s)
      return s
    }
  }
]
