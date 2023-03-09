import fmts from './formats.js'
import unixFmt from './unix.js'

const multiReplace = function (cal, str) {
  let sections = /\{(.+?)\}/g
  str = str.replace(sections, (_, name) => {
    name = name.toLowerCase().trim()
    if (fmts.hasOwnProperty(name)) {
      return fmts[name](cal)
    }
    return `{${name}}`
  })
  return str
}

let methods = {
  format: function (fmt = 'iso-short') {
    const { epoch, tz, world } = this
    const getCal = world.methods.getCal
    let cal = getCal(epoch, tz, world)
    if (fmt && fmts.hasOwnProperty(fmt)) {
      return fmts[fmt](this)
    }
    return multiReplace(cal, fmt)
  },
  unixFmt: function (fmt) {
    const { epoch, tz, world } = this
    const getCal = world.methods.getCal
    let cal = getCal(epoch, tz)
    return unixFmt(cal, fmt, tz, world)
  }
}

// add extra wrappers for format methods
let diriv = ['iso']
diriv.forEach(fn => {
  methods[fn] = function () {
    const getCal = this.methods.getCal
    let cal = getCal(this.epoch, this.tz)
    return fmts[fn](cal)
  }
})

export default methods