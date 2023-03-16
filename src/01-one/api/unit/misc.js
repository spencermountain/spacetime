
import { zeroPad } from './format/_lib.js'

const getter = {
  week: (s) => {
    let start = s.startOf('year').startOf('week')
    return start.diff(s, 'week')
  },
  dayOfYear: (s) => {
    let start = s.startOf('year')
    return start.diff(s, 'day')
  }
}

const setter = {
  week: (s, input) => {
    let d = s.startOf('year').startOf('week')
    return d.add(input, 'week')
  },
  dayOfYear: (s, input) => {
    let d = s.startOf('year')
    return d.add(input, 'day')
  }
}

export default {


  monthName: function (input) {
    const { world } = this
    if (input !== undefined) { }
    let n = this.month()
    return world.model.months[n].longForm
  },
  week: function (input) {
    if (input !== undefined) {
      return setter.week(this, input)
    }
    return getter.week(this)
  },

  dayOfYear: function (input) {
    if (input !== undefined) {
      let s = this.startOf('year')
      return s.add(input, 'day')
    }
    return getter.dayOfYear(this)
  },
  daysInMonth: function () {
    const monthLen = this.world.methods.monthLen
    return monthLen(this.month(), this.year(), this.world)
  },
  isLeapYear: function () {
    const isLeapYear = this.world.methods.isLeapYear
    return isLeapYear(this.year())
  },
  timezone: function () {
    return {
      name: this.tz,
      // hasDst: true,
      // default_offset: -4,
      // hemisphere: 'North',
      // current: { offset: -5, isDST: false },
      // change: { start: '03/12:02', back: '11/05:02' }
    }
  },

  time: function (input) {
    if (input !== undefined) {
      let { epoch, tz, world } = this
      let cal = world.methods.getCal(epoch, tz, world)
      let c = setters.time(input, cal, tz)
      let e = world.methods.getEpoch(c, tz, this.world)
      return this._from(e, tz)
    }
    return `${this.hour()}:${zeroPad(this.minute())}${this.ampm()}`
  },

  clone: function () {
    return this._from(this.epoch, this.tz)
  },

  isValid: () => true,

  hasDst: function () {
    let { tz, world } = this
    return world.zones[tz].dst
  },
  isAsleep: function () {
    return false
  },

  inDst: function () {
    let { epoch, tz, world } = this
    const { getCal, dstChanges } = world.methods
    // if it doesn't have dst
    if (!this.hasDst()) {
      return false
    }
    let cal = getCal(epoch, tz, world)
    let res = dstChanges(tz, cal.year, world)
    // console.log(res)
    return true
  },

  json: function () {
    let { epoch, tz, world } = this
    const { getCal, dstChanges } = world.methods
    let out = getCal(epoch, tz, world)
    out.epoch = epoch
    out.tz = tz
    let z = world.zones[tz] || {}
    out.hem = z.hem
    // out.abbrevs = z.shrt
    out.dst = dstChanges(tz, out.year)
    return out
  }
}