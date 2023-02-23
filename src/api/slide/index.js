import getCal from '../../compute/cal/index.js'
import getEpoch from '../../compute/epoch/index.js'
import { SECOND, MINUTE, HOUR, DAY } from '../../compute/_lib/millis.js'
import Spacetime from '../../spacetime.js'
import tickBy from './tick.js'

const slideUnits = {
  ms: 1,
  milli: 1,
  millis: 1,
  millisecond: 1,
  milliseconds: 1,
  second: SECOND,
  seconds: SECOND,
  minute: MINUTE,
  minutes: MINUTE,
  h: HOUR,
  hs: HOUR,
  hour: HOUR,
  hours: HOUR,
}

export default {

  add: function (n, unit) {
    let { epoch, tz } = this
    // let epoch = add(this.epoch, n, unit)
    if (n === 0 || !unit) {
      return epoch
    }
    unit = unit.trim().toLowerCase()
    // millisecond-math for these units
    if (slideUnits.hasOwnProperty(unit)) {
      let ms = slideUnits[unit]      // how many milliseconds are we adding?
      epoch += ms * n
      return new Spacetime(epoch, tz)
    }
    // add a 'tick' unit
    let cal = getCal(epoch, tz)
    cal = tickBy(cal, n, unit)
    epoch = getEpoch(cal, tz)
    return new Spacetime(epoch, tz)
  },

  subtract: function (n, unit) {
    return this.add(n * -1, unit)
  },
}