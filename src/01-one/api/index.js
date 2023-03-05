import getters from './getter/index.js'
import setters from './setter/index.js'
import fmts from './format/index.js'
import getEpoch from '../compute/epoch/index.js'
import getCal from '../compute/cal/index.js'
import add from './slide/index.js'
import compare from './compare/index.js'
import diff from './diff/index.js'
import startOf from './startOf.js'
import misc from './misc.js'
import zones from '../../02-two/zones/data/index.js'
import getDst from '../compute/changes/index.js'

let methods = {}

// generate all getter/setter function pairs
Object.keys(getters).forEach(fn => {
  if (!setters[fn]) {
    console.error('no-setter:', fn)
  }
  methods[fn] = function (input, dir) {
    let { epoch, tz } = this
    let cal = getCal(epoch, tz)
    // setter method
    if (input !== undefined) {
      let c = setters[fn](input, cal, tz, dir)
      let e = getEpoch(c, tz)
      return this._from(e, tz)
    }
    // getter method
    return getters[fn](cal, tz)
  }
})

// add format methods
Object.assign(methods, fmts, add, compare, startOf, misc, diff)

methods.time = function (input) {
  if (input !== undefined) {
    let { epoch, tz } = this
    let cal = getCal(epoch, tz)
    let c = setters.time(input, cal, tz)
    let e = getEpoch(c, tz)
    return this._from(e, tz)
  }
  return this.format('time')
}

methods.clone = function () {
  return this._from(this.epoch, this.tz)
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
methods.leapYear = methods.isLeapYear
methods.isLeap = methods.isLeapYear

export default methods