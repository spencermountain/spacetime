'use strict'
const guessTz = require('./timezone/guessTz')
const timezone = require('./timezone/index')
const handleInput = require('./input')
const methods = require('./methods')
let zones = require('../data')

//fake timezone-support, for fakers (es5 class)
const SpaceTime = function(input, tz, options) {
  options = options || {}
  //the holy moment
  this.epoch = new Date().getTime()
  //the shift for the given timezone
  this.tz = tz || guessTz()
  //whether to output warnings to console
  this.silent = options.silent || false
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function() {
      let meta = timezone(this) || {}
      //every computer is somewhere- get this computer's built-in offset
      let bias = new Date(this.epoch).getTimezoneOffset() || 0
      //movement
      let shift = bias + (meta.current.offset * 60) //in minutes
      shift = shift * 60 * 1000 //in ms
      //remove this computer's offset
      let epoch = this.epoch + shift
      let d = new Date(epoch)
      return d
    }
  })
  //add this data on the object, to allow adding new timezones
  Object.defineProperty(this, 'timezones', {
    get: function() {
      return zones
    },
    set: function(obj) {
      zones = obj
      return obj
    }
  })
  //parse the various formats
  handleInput(this, input, tz, options)
}

//(add instance methods to prototype)
Object.keys(methods).forEach(k => {
  SpaceTime.prototype[k] = methods[k]
})

// ¯\_(ツ)_/¯
SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent
  })
}

//append more methods
require('./methods/query')(SpaceTime)
require('./methods/add')(SpaceTime)
require('./methods/same')(SpaceTime)
require('./methods/compare')(SpaceTime)
require('./methods/i18n')(SpaceTime)

module.exports = SpaceTime
