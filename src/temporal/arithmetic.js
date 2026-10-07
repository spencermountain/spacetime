import { duration, unitName } from './_lib.js'

const arithmetic = {
  add(amount, unit) {
    if (!this.isValid()) {
      return this.clone()
    }
    return this._result(this._clock.add(duration(Number(amount), unit)))
  },
  subtract(amount, unit) { return this.add(-Number(amount), unit) },
  startOf(unit) {
    unit = unitName(unit)
    if (!this.isValid() || unit === 'millisecond') {
      return this.clone()
    }
    const s = this.clone()
    const values = { microsecond: 0, nanosecond: 0 }
    const clock = ['second', 'minute', 'hour']
    const index = clock.indexOf(unit)
    if (index !== -1 || unit === 'quarterhour') {
      values.millisecond = 0
      if (index >= 1 || unit === 'quarterhour') {
        values.second = 0
      }
      if (index >= 2) {
        values.minute = 0
      }
      if (unit === 'quarterhour') {
        values.minute = Math.floor(s.minute() / 15) * 15
      }
      return s._with(values)
    }
    if (unit === 'week') {
      return s.subtract((s.day() - s._weekStart + 7) % 7, 'day').startOf('day')
    }
    if (unit === 'month' || unit === 'quarter') {
      values.day = 1
      if (unit === 'quarter') {
        values.month = (s.quarter() - 1) * 3 + 1
      }
    } else if (['year', 'decade', 'century', 'millennium'].includes(unit)) {
      values.month = 1
      values.day = 1
      const size = { year: 1, decade: 10, century: 100, millennium: 1000 }[unit]
      values.year = Math.trunc(s.year() / size) * size
    } else if (unit !== 'day') {
      throw new RangeError(`Unsupported Temporal boundary: ${unit}`)
    }
    const result = s._with(values)
    if (result._pending) {
      return result._with({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    }
    return result._result(result._value.startOfDay())
  },
  endOf(unit) { return this.startOf(unit).add(1, unit).subtract(1, 'millisecond') },
  next(unit) { return this.add(1, unit).startOf(unit) },
  last(unit) { return this.subtract(1, unit).startOf(unit) },
  progress(unit) {
    const start = this.startOf(unit).epoch
    const end = this.startOf(unit).add(1, unit).epoch
    return (this.epoch - start) / (end - start)
  },
  nearest(unit) {
    const start = this.startOf(unit)
    return this.progress(unit) >= 0.5 ? start.add(1, unit) : start
  }
}
arithmetic.plus = arithmetic.add
arithmetic.minus = arithmetic.subtract
arithmetic.round = arithmetic.nearest

export default arithmetic
