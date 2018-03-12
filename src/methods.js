'use strict'
const format = require('./methods/format')
const progress = require('./methods/progress')
const nearest = require('./methods/nearest')
const diff = require('./methods/diff')
const since = require('./methods/since')
const ends = require('./methods/startOf')
const timezone = require('./timezone/index')
const handleInput = require('./input')

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
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
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
    return this.valid && !isNaN(this.d.getTime())
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
methods.inDST = methods.isDST
methods.round = methods.nearest
module.exports = methods
