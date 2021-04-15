const walkTo = require('../../methods/set/walk')
const months = require('../../data/months').mapping()
const parse = require('./_parsers')

module.exports = [
  // =====
  // no dates
  // =====
  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()]
      let year = parse.year(arr[2], s._today)
      let obj = {
        year,
        month,
        date: s._today.date || 1
      }
      if (parse.validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parse.time(s, arr[4])
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
      //make negative-year
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1')
      //remove commas
      str = str.replace(/,/g, '')
      let year = parseInt(str.trim(), 10)
      let d = new Date()
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      }
      if (parse.validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parse.time(s)
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
      let year = parseInt(str.trim(), 10)
      let d = new Date()
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      }
      if (parse.validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parse.time(s)
      return s
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (s, arr) => {
      let today = s._today
      let year = parse.year(arr[0], today)
      let d = new Date()
      // using today's date, but a new month is awkward.
      if (today.month && !today.date) {
        today.date = 1
      }
      let obj = {
        year,
        month: today.month || d.getMonth(),
        date: today.date || d.getDate()
      }
      if (parse.validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parse.time(s)
      return s
    }
  }
]
