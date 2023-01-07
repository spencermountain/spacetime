import getCal from '../../compute/cal/index.js'
import format from './format.js'
let methods = {}

// format methods
let formats = [
  ['iso', '{iso-year}-{month-pad}-{date-pad}T{hour-24-pad}:{minute-pad}:{second-pad}.{millisecond-pad}{offset}'],
  ['iso-short', '{year}-{month-pad}-{date-pad}'],
]
formats.forEach(a => {
  let [fn, fmt] = a
  methods[fn] = function () {
    let cal = getCal(this.epoch, this.tz)
    return format(cal, fmt)
  }
})

export default methods