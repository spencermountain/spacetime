import { getUnit } from '../_units.js'
import diffOne from './diff/_diffOne.js'

const units = [
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years',
  // 'quarters',
  // 'weeks',
]

export default {
  // 
  diff: function (b, unit) {
    b = this._from(b)
    if (unit) {
      unit = getUnit(unit)
      return diffOne(this, b, unit)
    }
    return units.reduce((h, u) => {
      h[u] = diffOne(this, b, u)
      return h
    }, {})
  },
  since: function (b, unit) {
    unit = getUnit(unit)
    return {}
  }
}