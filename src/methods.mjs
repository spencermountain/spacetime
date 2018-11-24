'use strict'
import format from './methods/format'
import unixFmt from './methods/format/unixFmt'
import progress from './methods/progress'
import nearest from './methods/nearest'
import diff from './methods/diff'
import since from './methods/since'
import { startOf, endOf } from './methods/startOf'
import timezone from './timezone/index'
import handleInput from './input'
import { isLeapYear } from './fns'

//the spacetime instance methods (also, the API)
const methods = {
  set: function(input) {
    let s = this.clone()
    s = handleInput(s, input)
    return s
  },
  timezone: function() {
    return timezone(this)
  },
  isDST: function() {
    return timezone(this).current.isDST
  },
  hasDST: function() {
    return timezone(this).hasDst
  },
  offset: function() {
    return timezone(this).current.offset * 60
  },
  hemisphere: function() {
    return timezone(this).hemisphere
  },
  format: function(fmt) {
    return format(this, fmt)
  },
  unixFmt: function(fmt) {
    return unixFmt(this, fmt)
  },
  startOf: function(unit) {
    return startOf(this, unit)
  },
  endOf: function(unit) {
    return endOf(this, unit)
  },
  leapYear: function() {
    let year = this.year()
    return isLeapYear(year)
  },
  progress: function() {
    return progress(this)
  },
  nearest: function(unit) {
    return nearest(this, unit)
  },
  diff: function(d, unit) {
    return diff(this, d, unit)
  },
  since: function(d) {
    if (!d) {
      d = this.clone().set()
    }
    return since(this, d)
  },
  isValid: function() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false
    }
    return !isNaN(this.d.getTime())
  },
  //travel to this timezone
  goto: function(tz) {
    let s = this.clone()
    s.tz = tz //science!
    return s
  },
  isAwake: function() {
    let hour = this.hour()
    //10pm -> 8am
    if (hour < 8 || hour > 22) {
      return false
    }
    return true
  },
  isAsleep: function() {
    return !this.isAwake()
  },
  //pretty-printing
  log: function() {
    console.log('')
    console.log(format(this, 'nice-short'))
    return this
  },
  logYear: function() {
    console.log('')
    console.log(format(this, 'full-short'))
    return this
  },
  debug: function() {
    let tz = this.timezone()
    let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year()
    date += '\n     - ' + this.format('time')
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')')
    return this
  },
}
// aliases
methods.inDST = methods.isDST
methods.round = methods.nearest
export default methods
