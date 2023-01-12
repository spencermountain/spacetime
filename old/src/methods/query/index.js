import timeFns from './01-time.js'
import dateFns from './02-date.js'
import yearFns from './03-year.js'

const methods = Object.assign({}, timeFns, dateFns, yearFns)

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

export default addMethods
