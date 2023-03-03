import { getUnit } from './_units.js'
import getCal from '../compute/cal/index.js'
import getEpoch from '../compute/epoch/index.js'
import config from '../../config.js'


const add = (a, b) => Object.assign({}, a, b)

// which zeros to cascade, for 'start of hour', etc.
let z = { millisecond: {} }
z.second = add(z.millisecond, { millisecond: 0 })
z.minute = add(z.second, { second: 0 })
z.hour = add(z.minute, { minute: 0 })
z.date = add(z.hour, { hour: 0 })
z.month = add(z.date, { date: 1 })
z.year = add(z.month, { month: 1 })

const roundYear = (c, by) => {
  c.year = Math.floor(c.year / by) * by
  return c
}

const startMisc = {
  week: (c) => {
    c = c.day(config.weekStart)
    return c
  },
  decade: (c) => roundYear(c, 10),
  century: (c) => roundYear(c, 100),
  millenium: (c) => roundYear(c, 1000)
}

export default {
  startOf: function (unit) {
    unit = getUnit(unit)
    let cal = getCal(this.epoch, this.tz)
    if (z.hasOwnProperty(unit)) {
      cal = Object.assign(cal, z[unit])
    } else if (startMisc.hasOwnProperty(unit)) {
      cal = startMisc[unit](cal)
    }
    let epoch = getEpoch(cal, this.tz)
    return this._from(epoch)
  },
  next: function (unit) {
    unit = getUnit(unit)
    let s = this.startOf(unit)
    return s.add(1, unit)
  },
  last: function (unit) {
    unit = getUnit(unit)
    let s = this.startOf(unit)
    return s.minus(1, unit)
  },
  endOf: function (unit) {
    unit = getUnit(unit)
    let s = this.next(unit)  // go to next one, step back 1ms
    s = s.subtract(1, 'millisecond')
    return s
  }
}