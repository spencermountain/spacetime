import Spacetime from './spacetime.js'
import whereIts from './whereIts.js'
import version from './_version.js'

const main = (input, tz, options) => new Spacetime(input, tz, options)

// set all properties of a given 'today' object
const setToday = function (s) {
  let today = s._today || {}
  Object.keys(today).forEach((k) => {
    s = s[k](today[k])
  })
  return s
}

//some helper functions on the main method
main.now = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  s = setToday(s)
  return s
}
main.today = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  s = setToday(s)
  return s.startOf('day')
}
main.tomorrow = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  s = setToday(s)
  return s.add(1, 'day').startOf('day')
}
main.yesterday = (tz, options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  s = setToday(s)
  return s.subtract(1, 'day').startOf('day')
}
main.extend = function (obj = {}) {
  Object.keys(obj).forEach((k) => {
    Spacetime.prototype[k] = obj[k]
  })
  return this
}
main.timezones = function () {
  let s = new Spacetime()
  return s.timezones
}
main.max = function (tz, options) {
  let s = new Spacetime(null, tz, options)
  s.epoch = 8640000000000000
  return s
}
main.min = function (tz, options) {
  let s = new Spacetime(null, tz, options)
  s.epoch = -8640000000000000
  return s
}

//find tz by time
main.whereIts = whereIts
main.version = version

//aliases:
main.plugin = main.extend
export default main
