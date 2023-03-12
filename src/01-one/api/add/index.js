import tickBy from './tick.js'
import { getUnit } from '../_units.js'

export default {

  add: function (n, unit) {
    let { epoch, tz, world } = this
    const { getCal, getEpoch } = world.methods
    const units = world.model.ms
    // let epoch = add(this.epoch, n, unit)
    if (n === 0 || !unit) {
      return this._from(epoch, tz)
    }
    unit = getUnit(unit)
    // millisecond-math for these units
    if (units.hasOwnProperty(unit)) {
      let ms = units[unit]      // how many milliseconds are we adding?
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
    let cal = getCal(epoch, tz, world)
    cal = tickBy(cal, n, unit, world)
    let e = getEpoch(cal, tz, world)
    return this._from(e, tz)
  },

  subtract: function (n, unit) {
    return this.add(n * -1, unit)
  },
}