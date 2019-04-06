'use strict'
const Spacetime = require('./spacetime')
const whereIts = require('./whereIts')
const version = require('../_version')

const main = (input, tz, options) => new Spacetime(input, tz, options)

//some helper functions on the main method
main.now = (tz, options) => new Spacetime(new Date().getTime(), tz, options)
main.today = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  return s.startOf('day')
}
main.tomorrow = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  return s.add(1, 'day').startOf('day')
}
main.yesterday = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  return s.subtract(1, 'day').startOf('day')
}
main.extend = function(obj) {
  Object.keys(obj).forEach(k => {
    Spacetime.prototype[k] = obj[k]
  })
  return this
}
//find tz by time
main.whereIts = whereIts
main.version = version

//aliases:
main.plugin = main.extend
module.exports = main
