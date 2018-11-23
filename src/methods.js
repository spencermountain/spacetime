'use strict'
const format = require('./methods/format')
const progress = require('./methods/progress')
const nearest = require('./methods/nearest')
const diff = require('./methods/diff')
const since = require('./methods/since')
const ends = require('./methods/startOf')
const timezone = require('./timezone/index')
const handleInput = require('./input')
const fns = require('./fns')

//the spacetime instance methods (also, the API)
const methods = {
  set: function(input) {
    handleInput(this, input)
    return this
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
    return timezone(this).current.offset / 60
  },
  hemisphere: function() {
    return timezone(this).hemisphere
  },
  format: function(fmt) {
    return format(this, fmt)
  },
  startOf: function(unit) {
    return ends.startOf(this, unit)
  },
  endOf: function(unit) {
    return ends.endOf(this, unit)
  },
  leapYear: function() {
    let year = this.year()
    return fns.isLeapYear(year)
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
    this.tz = tz //science!
    return this
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
module.exports = methods
