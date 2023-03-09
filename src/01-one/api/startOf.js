import { getUnit } from './_units.js'
// import getCal from '../compute/cal/index.js'
// import getEpoch from '../compute/epoch/index.js'


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
  quarterHour: (c) => {
    let m = c.minute
    if (m >= 45) {
      c.minute = 45
    } else if (m >= 30) {
      c.minute = 30
    } else if (m >= 15) {
      c.minute = 15
    } else {
      c.minute = 0
    }
    return Object.assign(c, { millisecond: 0, second: 0 })
  },
  decade: (c) => roundYear(c, 10),
  century: (c) => roundYear(c, 100),
  millenium: (c) => roundYear(c, 1000)
}

export default {
  startOf: function (unit) {
    const { getCal, getEpoch } = this.methods
    unit = getUnit(unit)
    let cal = getCal(this.epoch, this.tz)
    if (z.hasOwnProperty(unit)) {
      cal = Object.assign(cal, z[unit])
    } else if (startMisc.hasOwnProperty(unit)) {
      cal = startMisc[unit](cal)
    }
    // this one is tricky
    if (unit === 'week') {
      let s = this.day(this.world.config.weekStart)
      s = s.startOf('day')
      cal = getCal(s.epoch, s.tz)
    }
    let epoch = getEpoch(cal, this.tz, this.world)
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
  },
  progress: function (unit) {
    return {}
  }
}