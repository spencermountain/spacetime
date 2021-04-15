const walkTo = require('../../methods/set/walk')
const fns = require('../../fns')
const { validate, parseTime, parseYear, parseMonth } = require('./_parsers')

module.exports = [
  // =====
  //  d-m-y
  // =====
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = parseMonth(arr[2])
      let year = parseYear(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1] || '')
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
  // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})([a-z]+),?( [0-9]{4})?,? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = parseMonth(arr[2])
      if (!month) {
        return null
      }
      let year = parseYear(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1])
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
  // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[\. -/]([a-z]+)[\. -/]([0-9]{4})?$/i,
    parse: (s, m) => {
      let month = parseMonth(m[2])
      let obj = {
        date: Number(m[1]),
        month: month,
        year: Number(m[3])
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = s.startOf('day')
      return s
    }
  }
]
