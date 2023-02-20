import getters from './getter.js'
import set from './setter.js'
import fmts from './format/index.js'
import getCal from '../compute/cal/index.js'

let methods = {}
// let units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'day', 'dayName']

// generate all getter/setter function pairs
Object.keys(getters).forEach(fn => {
  methods[fn] = function (input) {
    let { epoch, tz } = this
    if (input !== undefined) {
      return set[fn](epoch, tz, input)
    }
    let cal = getCal(epoch, tz)
    return getters[fn](cal)
  }
})

// add format methods
Object.assign(methods, fmts)

// aliases
methods.fmt = methods.format

export default methods