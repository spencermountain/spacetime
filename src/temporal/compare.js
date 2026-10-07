import { unitName } from './_lib.js'

const diffUnits = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond']
const compare = {
  diff(input, unit) {
    const other = this.set(input).goto(this.tz)
    if (!this.isValid() || !other.isValid()) {
      return NaN
    }
    const get = (name) => {
      name = unitName(name)
      return this._value.until(other._value, { largestUnit: name, smallestUnit: name, roundingMode: 'trunc' })[name + 's']
    }
    return unit ? get(unit) : Object.fromEntries(diffUnits.map((name) => [name + 's', get(name)]))
  },
  isSame(input, unit, tzAware = true) {
    if (!unit) {
      return null
    }
    let other = this.set(input)
    if (tzAware) {
      other = other.goto(this.tz)
    }
    if (!this.isValid() || !other.isValid()) {
      return false
    }
    if (unitName(unit) === 'millisecond') {
      return this.epoch === other.epoch
    }
    return this.startOf(unit)._value.toPlainDateTime().equals(other.startOf(unit)._value.toPlainDateTime())
  },
  isBetween(start, end, inclusive = false) {
    if (inclusive) {
      return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end)
    }
    return this.isAfter(start) && this.isBefore(end)
  }
}
const operators = { isBefore: (a, b) => a < b, isAfter: (a, b) => a > b, isEqual: (a, b) => a === b }
Object.keys(operators).forEach((key) => {
  compare[key] = function (input) {
    const other = this.set(input)
    return this.isValid() && other.isValid() ? operators[key](this.epoch, other.epoch) : null
  }
})

export default compare
