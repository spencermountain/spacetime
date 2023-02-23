import getters from './getter/index.js'
import setters from './setter/index.js'
import fmts from './format/index.js'
import Spacetime from '../spacetime.js'
import getEpoch from '../compute/epoch/index.js'
import getCal from '../compute/cal/index.js'
import add from './slide/index.js'

let methods = {}

const factory = (cal, tz) => {
  let epoch = getEpoch(cal, tz)
  return new Spacetime(epoch, tz)
}

// generate all getter/setter function pairs
Object.keys(getters).forEach(fn => {
  // if (!setters[fn]) {
  // console.error('no-setter:', fn)
  // }
  methods[fn] = function (input, dir) {
    let { epoch, tz } = this
    let cal = getCal(epoch, tz)
    // setter method
    if (input !== undefined) {
      let c = setters[fn](input, cal, tz, dir)
      return factory(c, tz)
    }
    // getter method
    return getters[fn](cal)
  }
})

// add format methods
Object.assign(methods, fmts, add)

methods.time = function (input) {
  if (input !== undefined) {
    let { epoch, tz } = this
    let cal = getCal(epoch, tz)
    let c = setters.time(input, cal, tz)
    return factory(c, tz)
  }
  return this.format('time')
}

methods.clone = function () {
  return new Spacetime(this.epoch, this.tz)
}
// aliases
methods.fmt = methods.format

export default methods