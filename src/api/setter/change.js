import Spacetime from '../../spacetime.js'
import getCal from '../../compute/cal/index.js'
import getEpoch from '../../compute/epoch/index.js'

const factory = (cal, tz) => {
  let epoch = getEpoch(cal, tz)
  return new Spacetime(epoch, tz)
}

const units = ['ms', 'second', 'minute', 'hour', 'date', 'month', 'year']
const oneBased = { 'day': true, 'month': true }

const startOf = function (cal, unit) {
  let index = units.findIndex(s => unit === s)
  for (let i = 0; i < index; i += 1) {
    let u = units[i]
    cal[u] = oneBased[u] ? 1 : 0
  }
  return cal
}

const adHocs = {
  quarterHour: (cal) => {
    let m = cal.minute
    cal = startOf(cal, 'minute')
    if (m >= 45) {
      m = 45
    } else if (m >= 30) {
      m = 30
    } else if (m >= 15) {
      m = 15
    } else {
      m = 0
    }
    cal.minute = m
    return cal
  },
  decade: (cal) => {
    cal = startOf(cal, 'year')
    cal.year = parseInt(cal.year / 10, 10) * 10
    return cal
  },
  century: (cal) => {
    cal = startOf(cal, 'year')
    cal.year = parseInt(cal.year / 100, 10) * 100
    return cal
  }
}

export default {
  startOf: function (unit) {
    let cal = getCal(this.epoch, this.tz)
    if (adHocs.hasOwnProperty(unit)) {
      cal = adHocs[unit](cal)
    } else {
      cal = startOf(cal, unit)
    }
    return factory(cal, this.tz)
  },
  endOf: function (unit) {
    let s = this.startOf(unit)
    s = s.add(1, unit)
    s = s.minus(1, 'millisecond')
    return s
  },
  add: function (n, unit) {
    return this
  },
  subtract: function (n, unit) {
    return this
  }
}