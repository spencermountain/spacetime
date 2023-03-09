import getters from './getter/index.js'
import setters from './setter/index.js'
import fmts from './format/index.js'
import add from './add/index.js'
import compare from './compare/index.js'
import diff from './diff/index.js'
import startOf from './startOf.js'
import misc from './misc.js'
import { zeroPad } from './format/_lib.js'

let methods = {}

// generate all getter / setter function pairs
Object.keys(getters).forEach(fn => {
  if (!setters[fn]) {
    console.error('no-setter:', fn)
  }
  methods[fn] = function (input, dir) {
    let { epoch, tz, world } = this
    let cal = world.methods.getCal(epoch, tz, world)
    // setter method
    if (input !== undefined) {
      let c = setters[fn](input, cal, tz, dir)
      let e = world.methods.getEpoch(c, tz, world)
      return this._from(e, tz)
    }
    // getter method
    return getters[fn](cal, tz, world)
  }
})

// add format methods
Object.assign(methods, add, fmts, compare, startOf, misc, diff)

methods.time = function (input) {
  if (input !== undefined) {
    let { epoch, tz, world } = this
    let cal = world.methods.getCal(epoch, tz)
    let c = setters.time(input, cal, tz)
    let e = world.methods.getEpoch(c, tz, this.world)
    return this._from(e, tz)
  }
  return `${this.hour()}:${zeroPad(this.minute())}${this.ampm()}`
}

methods.clone = function () {
  return this._from(this.epoch, this.tz)
}

methods.isValid = () => true

methods.hasDst = function () {
  let { tz, world } = this
  return world.zones[tz].dst
}
methods.isAsleep = function () {
  return false
}
methods.offset = function () {
  let { epoch, tz, world } = this
  let cal = world.methods.getCal(epoch, tz, world)
  return cal.offset
}
methods.inDst = function () {
  let { epoch, tz, world } = this
  const { getCal, dstChanges } = world.methods
  // if it doesn't have dst
  if (!this.hasDst()) {
    return false
  }
  let cal = getCal(epoch, tz)
  let res = dstChanges(tz, cal.year, world)
  // console.log(res)
  return true
}

methods.json = function () {
  let { epoch, tz, world } = this
  const { getCal, dstChanges } = world.methods
  let out = getCal(epoch, tz)
  out.epoch = epoch
  out.tz = tz
  let z = world.zones[tz] || {}
  out.hem = z.hem
  out.abbrevs = z.shrt
  out.dst = dstChanges(tz, out.year)
  return out
}
// aliases
methods.fmt = methods.format
methods.text = methods.format
// methods.leapYear = methods.isLeapYear
// methods.isLeap = methods.isLeapYear
methods.inDST = methods.inDst
methods.hasDST = methods.hasDst

export default methods