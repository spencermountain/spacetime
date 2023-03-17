import getter from './getter.js'
import setter from './setter.js'
import dayMethods from './day.js'
import misc from './misc.js'


// getter/setter functions are overloaded
let methods = Object.keys(getter).reduce((h, unit) => {
  h[unit] = function (input, fwd) {
    if (typeof input === 'undefined') {
      return getter[unit](this)
    }
    return setter[unit](this, input, fwd)
  }
  return h
}, {})

Object.assign(methods, dayMethods, misc)
export default methods

