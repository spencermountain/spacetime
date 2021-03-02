const format = require('./methods/format')
const unixFmt = require('./methods/format/unixFmt')
const progress = require('./methods/progress')
const nearest = require('./methods/nearest')
const diff = require('./methods/diff')
const since = require('./methods/since')
const ends = require('./methods/startOf')
const every = require('./methods/every')
const timezone = require('./timezone/index')
const findTz = require('./timezone/find')
const handleInput = require('./input')
const fns = require('./fns')
const days = require('./data/days')
const units = [
  'century',
  'decade',
  'year',
  'month',
  'date',
  'day',
  'hour',
  'minute',
  'second',
  'millisecond'
]

//the spacetime instance methods (also, the API)
const methods = {
  set: function (input, tz) {
    let s = this.clone()
    s = handleInput(s, input, null)
    if (tz) {
      this.tz = findTz(tz)
    }
    return s
  },
  timezone: function () {
    return timezone(this)
  },
  isDST: function () {
    return timezone(this).current.isDST
  },
  hasDST: function () {
    return timezone(this).hasDst
  },
  offset: function () {
    return timezone(this).current.offset * 60
  },
  hemisphere: function () {
    return timezone(this).hemisphere
  },
  format: function (fmt) {
    return format(this, fmt)
  },
  unixFmt: function (fmt) {
    return unixFmt(this, fmt)
  },
  startOf: function (unit) {
    return ends.startOf(this, unit)
  },
  endOf: function (unit) {
    return ends.endOf(this, unit)
  },
  leapYear: function () {
    let year = this.year()
    return fns.isLeapYear(year)
  },
  progress: function (unit) {
    return progress(this, unit)
  },
  nearest: function (unit) {
    return nearest(this, unit)
  },
  diff: function (d, unit) {
    return diff(this, d, unit)
  },
  since: function (d) {
    if (!d) {
      d = this.clone().set()
    }
    return since(this, d)
  },
  next: function (unit) {
    let s = this.add(1, unit)
    return s.startOf(unit)
  },
  //the start of the previous year/week/century
  last: function (unit) {
    let s = this.subtract(1, unit)
    return s.startOf(unit)
  },
  isValid: function () {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false
    }
    return !isNaN(this.d.getTime())
  },
  //travel to this timezone
  goto: function (tz) {
    let s = this.clone()
    s.tz = findTz(tz, s.timezones) //science!
    return s
  },
  //get each week/month/day between a -> b
  every: function (unit, to) {
    // allow swapping these params:
    if (typeof unit === 'object' && typeof to === 'string') {
      let tmp = to
      to = unit
      unit = tmp
    }
    return every(this, unit, to)
  },
  isAwake: function () {
    let hour = this.hour()
    //10pm -> 8am
    if (hour < 8 || hour > 22) {
      return false
    }
    return true
  },
  isAsleep: function () {
    return !this.isAwake()
  },
  //pretty-printing
  log: function () {
    console.log('')
    console.log(format(this, 'nice-short'))
    return this
  },
  logYear: function () {
    console.log('')
    console.log(format(this, 'full-short'))
    return this
  },
  json: function () {
    return units.reduce((h, unit) => {
      h[unit] = this[unit]()
      return h
    }, {})
  },
  debug: function () {
    let tz = this.timezone()
    let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year()
    date += '\n     - ' + this.format('time')
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')')
    return this
  },
  //alias of 'since' but opposite - like moment.js
  from: function (d) {
    d = this.clone().set(d)
    return d.since(this)
  },
  fromNow: function () {
    let d = this.clone().set(Date.now())
    return d.since(this)
  },
  weekStart: function (input) {
    //accept a number directly
    if (typeof input === 'number') {
      this._weekStart = input
      return this
    }
    if (typeof input === 'string') {
      // accept 'wednesday'
      input = input.toLowerCase().trim()
      let num = days.short().indexOf(input)
      if (num === -1) {
        num = days.long().indexOf(input)
      }
      if (num === -1) {
        num = 1 //go back to default
      }
      this._weekStart = num
    } else {
      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input)
    }
    return this
  }
}
// aliases
methods.inDST = methods.isDST
methods.round = methods.nearest
methods.each = methods.every
module.exports = methods
