import getters from './getter/index.js'
import setters from './setter/index.js'
import fmts from './format/index.js'
import Spacetime from '../../spacetime.js'
import getEpoch from '../compute/epoch/index.js'
import getCal from '../compute/cal/index.js'
import add from './slide/index.js'
import zones from '../../02-two/zones/index.js'
import getDst from '../compute/changes/index.js'

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
    return getters[fn](cal, tz)
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

methods.json = function () {
  let { epoch, tz } = this
  let out = getCal(epoch, tz)
  out.epoch = epoch
  out.tz = tz
  let z = zones[tz] || {}
  out.hem = z.hem
  out.abbrevs = z.shrt
  out.dst = getDst(tz, out.year)
  return out
}
// aliases
methods.fmt = methods.format
methods.text = methods.format

export default methods