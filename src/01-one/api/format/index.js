import fmts from './formats.js'
import unixFmt from './unix.js'

const multiReplace = function (s, str, cal) {
  let sections = /\{(.+?)\}/g
  str = str.replace(sections, (_, name) => {
    name = name.toLowerCase().trim()
    if (fmts.hasOwnProperty(name)) {
      return fmts[name](s, cal)
    }
    return `{${name}}`
  })
  return str
}

const getCal = (s) => s.world.methods.getCal(s.epoch, s.tz, s.world)

let methods = {
  format: function (fmt = 'iso-short') {
    let cal = getCal(this)
    if (fmt && fmts.hasOwnProperty(fmt)) {
      return fmts[fmt](this, cal)
    }
    return multiReplace(this, fmt, cal)
  },
  unixFmt: function (fmt) {
    let cal = getCal(this)
    return unixFmt(this, fmt, cal)
  },
  iso: function () {
    return this.format('iso')
  }
}

// add extra wrappers for format methods
// let diriv = ['iso']
// diriv.forEach(fn => {
//   methods[fn] = function () {
//     const getCal = this.methods.getCal
//     let cal = getCal(this.epoch, this.tz, this.world)
//     return fmts[fn](cal)
//   }
// })

export default methods