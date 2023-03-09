// import getCal from '../../compute/cal/index.js'
import replace from './replace.js'
import formats from './formats.js'
import unixFmt from './unix.js'


let methods = {
  format: function (fmt = 'iso-short') {
    const { epoch, tz, world } = this
    const getCal = world.methods.getCal
    let cal = getCal(epoch, tz, world)
    if (fmt && formats.hasOwnProperty(fmt)) {
      return formats[fmt](cal, world)
    }
    return replace(cal, fmt)
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
    return formats[fn](cal)
  }
})

export default methods