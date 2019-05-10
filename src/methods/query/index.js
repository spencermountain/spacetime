const methods = Object.assign({}, require('./01-time'), require('./02-date'), require('./03-year'))

//aliases
methods.milliseconds = methods.millisecond
methods.seconds = methods.second
methods.minutes = methods.minute
methods.hours = methods.hour
methods.hour24 = methods.hour
methods.h12 = methods.hour12
methods.h24 = methods.hour24
methods.days = methods.day

const addMethods = Space => {
  //hook the methods into prototype
  Object.keys(methods).forEach(k => {
    Space.prototype[k] = methods[k]
  })
}

module.exports = addMethods
