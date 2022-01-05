//make a string, for easy comparison between dates
const print = {
  millisecond: (s) => {
    return s.epoch
  },
  second: (s) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-')
  },
  minute: (s) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-')
  },
  hour: (s) => {
    return [s.year(), s.month(), s.date(), s.hour()].join('-')
  },
  day: (s) => {
    return [s.year(), s.month(), s.date()].join('-')
  },
  week: (s) => {
    return [s.year(), s.week()].join('-')
  },
  month: (s) => {
    return [s.year(), s.month()].join('-')
  },
  quarter: (s) => {
    return [s.year(), s.quarter()].join('-')
  },
  year: (s) => {
    return s.year()
  }
}
print.date = print.day

const addMethods = (SpaceTime) => {
  SpaceTime.prototype.isSame = function (b, unit, tzAware = true) {
    let a = this
    if (!unit) {
      return null
    }
    // support swapped params
    if (typeof b === 'string' && typeof unit === 'object') {
      let tmp = b
      b = unit
      unit = tmp
    }
    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name)
    }
    //support 'seconds' aswell as 'second'
    unit = unit.replace(/s$/, '')

    // make them the same timezone for proper comparison
    if (tzAware === true && a.tz !== b.tz) {
      b = b.clone()
      b.tz = a.tz
    }
    if (print[unit]) {
      return print[unit](a) === print[unit](b)
    }
    return null
  }
}

export default addMethods
