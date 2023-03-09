import getCal from '../../compute/cal/index.js'
import getEpoch from '../../compute/epoch/index.js'
import { SECOND, MINUTE, HOUR } from '../../compute/_lib/millis.js'
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
  'quarterhour': MINUTE * 15,
  'quarter-hour': MINUTE * 15,
  'quarter-hours': MINUTE * 15,
}


export default {

  add: function (n, unit) {
    let { epoch, tz, world } = this
    // let epoch = add(this.epoch, n, unit)
    if (n === 0 || !unit) {
      return this._from(epoch, tz)
    }
    unit = unit.trim().toLowerCase()
    // millisecond-math for these units
    if (slideUnits.hasOwnProperty(unit)) {
      let ms = slideUnits[unit]      // how many milliseconds are we adding?
      epoch += ms * n
      return this._from(epoch, tz)
    }
    // misc units
    if (unit === 'week' || unit === 'weeks') {
      n *= 7
      unit = 'day'
    }
    if (unit === 'quarter' || unit === 'quarters') {
      n *= 3
      unit = 'month'
    }
    if (unit === 'decade' || unit === 'decades') {
      n *= 10
      unit = 'year'
    }
    if (unit === 'century' || unit === 'centuries') {
      n *= 100
      unit = 'year'
    }
    // add a 'tick' unit
    let cal = getCal(epoch, tz)
    cal = tickBy(cal, n, unit)
    epoch = getEpoch(cal, tz, world)
    return this._from(epoch, tz)
  },

  subtract: function (n, unit) {
    return this.add(n * -1, unit)
  },
}