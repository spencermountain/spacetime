const walkTo = require('../methods/set/walk')
const months = require('../data/months').mapping()
const parseOffset = require('./parseOffset')
const parseTime = require('./parseTime')
const hasDate = require('./hasDate')
const fns = require('../fns')

const parseYear = (str = '', today) => {
  let year = parseInt(str.trim(), 10)
  // use a given year from options.today
  if (!year && today) {
    year = today.year
  }
  // fallback to this year
  year = year || new Date().getFullYear()
  return year
}

const strFmt = [
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
    parse: (s, arr, givenTz, options) => {
      let month = parseInt(arr[2], 10) - 1
      let obj = {
        year: arr[1],
        month,
        date: arr[3]
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      parseOffset(s, arr[5], givenTz, options)
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
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
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
      let year = parseYear(arr[3], s._today) || new Date().getFullYear()
      let obj = {
        year,
        month,
        date
      }
      if (hasDate(obj) === false) {
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
    parse: (s, arr, givenTz, options) => {
      let month = parseInt(arr[2], 10) - 1
      let obj = {
        year: arr[1],
        month,
        date: 1
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      parseOffset(s, arr[5], givenTz, options)
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months[arr[2].toLowerCase()]
      let year = parseYear(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1] || '')
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()]
      let year = parseYear(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[2] || '')
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },

  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()]
      let year = parseYear(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[2] || '')
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()]
      let year = parseYear(arr[2], s._today)
      let obj = {
        year,
        month,
        date: s._today.date || 1
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s, arr[4])
      return s
    }
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?,? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = months[arr[2].toLowerCase()]
      if (!month) {
        return null
      }
      let year = parseYear(arr[3], s._today)
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1])
      }
      if (hasDate(obj) === false) {
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
      if (hasDate(obj) === false) {
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
      let year = parseInt(str.trim(), 10)
      let d = new Date()
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      }
      if (hasDate(obj) === false) {
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
      let year = parseYear(arr[0], today)
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
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj)
      s = parseTime(s)
      return s
    }
  }
]

module.exports = strFmt
