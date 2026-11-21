import ms from '../../data/milliseconds.ts'
import type { Spacetime, TimeUnit } from '../../types/index.ts'

const precision: Record<string, TimeUnit> = {
  second: 'millisecond',
  minute: 'second',
  quarterhour: 'minute',
  hour: 'minute',
  date: 'hour',
  week: 'hour',
  month: 'day',
  quarter: 'day',
  season: 'day',
  year: 'day'
}
const years: Record<string, number> = { decade: 10, century: 100 }

// Round against local boundaries, including days with a DST transition.
// Ties go toward the start, so that add and subtract mirror each other.
const roundTo = (s: Spacetime, subunit: TimeUnit, forward: boolean) => {
  const lower = s.startOf(subunit)
  const upper = lower.add(1, subunit)
  const below = s.epoch - lower.epoch
  const above = upper.epoch - s.epoch
  if (below < above || (below === above && forward)) {
    return lower
  }
  return upper
}

const addFraction = (s: Spacetime, num: number, unit: TimeUnit) => {
  if (Object.prototype.hasOwnProperty.call(years, unit)) {
    return s.add(num * years[unit], 'year')
  }
  if (!Object.prototype.hasOwnProperty.call(precision, unit)) {
    return null
  }
  const start = s.clone()
  const whole = Math.trunc(num)
  let duration = ms[unit]
  if (unit === 'month' || unit === 'quarter' || unit === 'season' || unit === 'year') {
    // Keep calendar arithmetic for the whole part; only estimate the remainder.
    s = s.add(whole, unit)
    if (!s.isValid()) {
      return s
    }
    num %= 1
    duration = s.add(1, unit).epoch - s.epoch
    if (unit === 'month') {
      duration = 28 * ms.day
    }
  } else if (unit === 'quarterhour') {
    duration = 15 * ms.minute
  }
  s.epoch = Math.round(s.epoch + num * duration)
  const subunit = precision[unit]
  if (subunit === 'millisecond' || !s.isValid()) {
    return s
  }
  const rounded = roundTo(s, subunit, num > 0)
  // A fraction must land between its two whole-number neighbours.
  const near = start.add(whole, unit)
  const far = start.add(whole + Math.sign(num), unit)
  if (!near.isValid() || !far.isValid()) {
    return rounded
  }
  const min = Math.min(near.epoch, far.epoch)
  const max = Math.max(near.epoch, far.epoch)
  if (rounded.epoch >= min && rounded.epoch <= max) {
    return rounded
  }
  // Rounding would pass one of them, so keep the exact time instead.
  s.epoch = Math.min(max, Math.max(min, s.epoch))
  return s
}

export default addFraction
