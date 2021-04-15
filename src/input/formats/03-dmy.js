const walkTo = require('../../methods/set/walk')
const months = require('../../data/months').mapping()
const fns = require('../../fns')
const parse = require('./_parsers')

module.exports = [
  // =====
  //  d-m-y
  // =====
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months[arr[2].toLowerCase()]
      let year = parse.year(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1] || '')
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
  // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})([a-z]+),?( [0-9]{4})?,? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = months[arr[2].toLowerCase()]
      if (!month) {
        return null
      }
      let year = parse.year(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1])
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
  // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[\. -/]([a-z]+)[\. -/]([0-9]{4})?$/i,
    parse: (s, m) => {
      let month = months[m[2].toLowerCase()]
      let obj = {
        date: Number(m[1]),
        month: month,
        year: Number(m[3])
      }
      if (parse.validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = s.startOf('day')
      return s
    }
  }
]
