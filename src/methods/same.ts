import type { Spacetime } from '../types/index.ts'
//make a string, for easy comparison between dates
const print = {
  millisecond: (s: Spacetime) => {
    return s.epoch
  },
  second: (s: Spacetime) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-')
  },
  minute: (s: Spacetime) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-')
  },
  hour: (s: Spacetime) => {
    return [s.year(), s.month(), s.date(), s.hour()].join('-')
  },
  day: (s: Spacetime) => {
    return [s.year(), s.month(), s.date()].join('-')
  },
  week: (s: Spacetime) => {
    return [s.year(), s.week()].join('-')
  },
  month: (s: Spacetime) => {
    return [s.year(), s.month()].join('-')
  },
  quarter: (s: Spacetime) => {
    return [s.year(), s.quarter()].join('-')
  },
  year: (s: Spacetime) => {
    return s.year()
  },
  date: (s: Spacetime) => {
    return [s.year(), s.month(), s.date()].join('-')
  }
}

const isSame = function (b, unit: string, tzAware = true): boolean | null {
  const a = this
  if (!unit) {
    return null
  }
  // support swapped params
  if (typeof b === 'string' && typeof unit === 'object') {
    const tmp = b
    b = unit
    unit = tmp
  }
  if (typeof b === 'string' || typeof b === 'number') {
    b = new this.constructor(b, this.timezone.name)
  }
  if (!a.isValid() || b == null || b.isValid == null || !b.isValid()) {
    return false
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

export default { isSame }
