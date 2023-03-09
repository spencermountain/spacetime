import getCal from '../../compute/cal/index.js'
import replace from './replace.js'
import formats from './formats.js'
import unixFmt from './unix.js'


let methods = {
  format: function (fmt = 'iso-short') {
    let cal = getCal(this.epoch, this.tz)
    if (fmt && formats.hasOwnProperty(fmt)) {
      return formats[fmt](cal)
    }
    return replace(cal, fmt)
  },
  unixFmt: function (fmt) {
    let cal = getCal(this.epoch, this.tz)
    return unixFmt(cal, fmt, this.tz, this.world)
  }
}

// add extra wrappers for format methods
let diriv = ['iso']
diriv.forEach(fn => {
  methods[fn] = function () {
    let cal = getCal(this.epoch, this.tz)
    return formats[fn](cal)
  }
})

export default methods