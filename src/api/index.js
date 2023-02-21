import getters from './getters.js'
import setters from './setters.js'
import fmts from './format/index.js'
import getCal from '../compute/cal/index.js'

let methods = {}
// let units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'day', 'dayName']

// generate all getter/setter function pairs
Object.keys(getters).forEach(fn => {
  methods[fn] = function (input) {
    let { epoch, tz } = this
    let cal = getCal(epoch, tz)
    // setter method
    if (input !== undefined) {
      return setters[fn](input, cal, tz)
    }
    // getter method
    return getters[fn](cal)
  }
})

// add format methods
Object.assign(methods, fmts)

// aliases
methods.fmt = methods.format

export default methods