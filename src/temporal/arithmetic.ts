import addFraction from '../methods/_lib/fractional.ts'
import { duration, unitName, isBoundary, asMain, type ClockFields } from './_lib.ts'

const arithmetic = {
  add(amount: number | string, unit: string) {
    if (!this.isValid() || !unit || Number(amount) === 0) {
      return this.clone()
    }
    const name = unitName(unit)
    const values = duration(Number(amount), name)
    if (!values) {
      if (this.silent === false) {
        console.warn(`Warn: unsupported arithmetic unit "${unit}"`) // eslint-disable-line no-console
      }
      return this.clone()
    }
    if (Number.isFinite(Number(amount)) && !Number.isInteger(Number(amount))) {
      const fractional = addFraction(asMain(this.clone()), Number(amount), name === 'day' ? 'date' : name)
      if (fractional) {
        return fractional
      }
    }
    let result = this._result(this._clock.add(values))
    if (name === 'weekend' && result.day() !== 6) {
      result = result.day(6, true)
    }
    return result
  },
  subtract(amount: number | string, unit: string) { return this.add(-Number(amount), unit) },
  startOf(unit: string) {
    unit = unitName(unit)
    if (!this.isValid() || !isBoundary(unit)) {
      return this.clone()
    }
    const s = this.clone()
    const values: ClockFields = { microsecond: 0, nanosecond: 0 }
    if (unit === 'millisecond') {
      return s._with(values)
    }
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
      return s
    }
    const result = s._with(values)
    if (result._pending) {
      return result._with({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    }
    return result._result(result._value.startOfDay())
  },
  endOf(unit: string) { return isBoundary(unit) ? this.startOf(unit).add(1, unit).startOf(unit).subtract(1, 'millisecond') : this.clone() },
  next(unit: string) { return isBoundary(unit) ? this.add(1, unit).startOf(unit) : this.clone() },
  last(unit: string) { return isBoundary(unit) ? this.subtract(1, unit).startOf(unit) : this.clone() },
  progress(unit: string): number {
    if (!this.isValid() || !isBoundary(unit)) {
      return NaN
    }
    const start = this.startOf(unit)
    const end = start.add(1, unit).startOf(unit)
    if (!start.isValid() || !end.isValid()) {
      return NaN
    }
    return (this.epoch - start.epoch) / (end.epoch - start.epoch)
  },
  nearest(unit: string) {
    const start = this.startOf(unit)
    return this.progress(unit) >= 0.5 ? start.add(1, unit) : start
  }
}

export default {
  ...arithmetic,
  // aliases
  plus: arithmetic.add,
  minus: arithmetic.subtract,
  round: arithmetic.nearest
}
