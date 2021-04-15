const walkTo = require('../../methods/set/walk')
const { validate, parseTime, parseOffset } = require('./_parsers')

module.exports = [
  // =====
  //  y-m-d
  // =====
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
    parse: (s, arr) => {
      let month = parseInt(arr[2], 10) - 1
      let obj = {
        year: arr[1],
        month,
        date: arr[3]
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      parseOffset(s, arr[5])
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  //iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[\-\/.]([0-9]{1,2})[\-\/.]([0-9]{1,2}),?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let obj = {
        year: arr[1],
        month: parseInt(arr[2], 10) - 1,
        date: parseInt(arr[3], 10)
      }
      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(arr[2], 10)
        obj.month = parseInt(arr[3], 10) - 1
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
  // '2012-06' last attempt at iso-like format
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{2})$/i,
    parse: (s, arr) => {
      let month = parseInt(arr[2], 10) - 1
      let obj = {
        year: arr[1],
        month,
        date: 1
      }
      if (validate(obj) === false) {
        s.epoch = null
        return s
      }
      parseOffset(s, arr[5])
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  }
]
