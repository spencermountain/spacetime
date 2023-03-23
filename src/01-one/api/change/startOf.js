import { getUnit } from '../unit/_lib.js'

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
    const { tz, epoch, world } = this
    const { getCal, getEpoch } = world.methods
    unit = getUnit(unit)
    if (!unit) {
      return this
    }
    let cal = getCal(epoch, tz, world)
    if (z.hasOwnProperty(unit)) {
      cal = Object.assign(cal, z[unit])
    } else if (startMisc.hasOwnProperty(unit)) {
      cal = startMisc[unit](cal)
    }
    // this one is tricky
    if (unit === 'week') {
      let s = this//.day(this.world.config.weekStart)
      s = s.startOf('day')
      cal = getCal(s.epoch, s.tz, world)
    }
    let e = getEpoch(cal, this.tz, this.world)
    return this._from(e)
  },
  next: function (unit) {
    unit = getUnit(unit)
    if (!unit) {
      return this
    }
    let s = this.startOf(unit)
    return s.add(1, unit)
  },
  last: function (unit) {
    unit = getUnit(unit)
    if (!unit) {
      return this
    }
    let s = this.startOf(unit)
    return s.minus(1, unit)
  },
  endOf: function (unit) {
    unit = getUnit(unit)
    if (!unit) {
      return this
    }
    let s = this.next(unit)  // go to next one, step back 1ms
    s = s.subtract(1, 'millisecond')
    return s
  },
}