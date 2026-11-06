import type { Spacetime, SpacetimeInput, TimeUnit } from '../types/index.ts'
//make a string, for easy comparison between dates
const print: Record<string, (s: Spacetime) => string | number> = {
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

const isSame = function (this: Spacetime, b: SpacetimeInput, unit: TimeUnit, tzAware = true): boolean | null {
  const a = this
  if (!unit) {
    return null
  }
  // support swapped params
  if (typeof b === 'string' && typeof unit === 'object') {
    const tmp = b
    b = unit
    unit = tmp as TimeUnit
  }
  let other = b as Spacetime
  if (typeof b === 'string' || typeof b === 'number') {
    other = this.clone().set(b)
  }
  if (!a.isValid() || other == null || other.isValid == null || !other.isValid()) {
    return false
  }
  //support 'seconds' aswell as 'second'
  const name = unit.replace(/s$/, '')

  // make them the same timezone for proper comparison
  if (tzAware === true && a.tz !== other.tz) {
    other = other.clone()
    other.tz = a.tz
  }
  if (print[name]) {
    return print[name](a) === print[name](other)
  }
  return null
}

export default { isSame }
