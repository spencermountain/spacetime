/* eslint-disable no-console */
import format from './methods/format/index.js'
import unixFmt from './methods/format/unixFmt.js'
import progress from './methods/progress.js'
import nearest from './methods/nearest.js'
import diff from './methods/diff/index.js'
import since from './methods/since/index.js'
import { startOf as _startOf, endOf as _endOf } from './methods/startOf.js'
import every from './methods/every.js'
import timezone from './timezone/index.js'
import findTz from './timezone/find.js'
import handleInput from './input/index.js'
import { isLeapYear } from './fns.js'
import { short, long } from './data/days.js'
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
    return _startOf(this, unit)
  },
  endOf: function (unit) {
    return _endOf(this, unit)
  },
  leapYear: function () {
    let year = this.year()
    return isLeapYear(year)
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
  every: function (unit, to, stepCount) {
    // allow swapping these params:
    if (typeof unit === 'object' && typeof to === 'string') {
      let tmp = to
      to = unit
      unit = tmp
    }
    return every(this, unit, to, stepCount)
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
  daysInMonth: function () {
    switch (this.month()) {
      case 0:
        return 31
      case 1:
        return this.leapYear() ? 29 : 28
      case 2:
        return 31
      case 3:
        return 30
      case 4:
        return 31
      case 5:
        return 30
      case 6:
        return 31
      case 7:
        return 31
      case 8:
        return 30
      case 9:
        return 31
      case 10:
        return 30
      case 11:
        return 31
      default:
        throw new Error('Invalid Month state.')
    }
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
      let num = short().indexOf(input)
      if (num === -1) {
        num = long().indexOf(input)
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
export default methods
