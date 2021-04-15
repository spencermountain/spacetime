const walkTo = require('../../methods/set/walk')
const months = require('../../data/months').mapping()
const fns = require('../../fns')
const parse = require('./_parsers')

module.exports = [
  // =====
  //  m-d-y
  // =====
  //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[\-\/.]([0-9]{1,2})[\-\/.]?([0-9]{4})?,?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1
      let date = parseInt(arr[2], 10)
      //support dd/mm/yyy
      if (s.british || month >= 12) {
        date = parseInt(arr[1], 10)
        month = parseInt(arr[2], 10) - 1
      }
      let year = parse.year(arr[3], s._today) || new Date().getFullYear()
      let obj = {
        year,
        month,
        date
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
  //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()]
      let year = parse.year(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[2] || '')
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

  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()]
      let year = parse.year(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[2] || '')
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
  // 'Sun Mar 14 15:09:48 +0000 2021'
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parse.year(arr[5], s._today),
        month: months[arr[1].toLowerCase()],
        date: fns.toCardinal(arr[2] || '')
      }
      if (parse.validate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parse.time(s, arr[3])
      return s
    }
  }
]
