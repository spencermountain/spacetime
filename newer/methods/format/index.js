import getCal from '../../compute/cal/index.js'
import replace from './replace.js'
import formats from './formats.js'

let methods = {
  format: function (fmt) {
    let cal = getCal(this.epoch, this.tz)
    if (fmt && formats.hasOwnProperty(fmt)) {
      return formats[fmt](cal)
    }
    return replace(cal, fmt)
  }
}

// format methods
let deriv = [
  ['iso', '{iso-year}-{month-pad}-{date-pad}T{hour-24-pad}:{minute-pad}:{second-pad}.{millisecond-pad}{offset}'],
  ['iso-short', '{year}-{month-pad}-{date-pad}'],
  ['time', '{hour-12}:{minute-pad}{ampm}'],
]
deriv.forEach(a => {
  let [fn, fmt] = a
  methods[fn] = function () {
    let cal = getCal(this.epoch, this.tz)
    return replace(cal, fmt)
  }
})

export default methods