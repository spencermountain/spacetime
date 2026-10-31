import { unitName, isBoundary } from './_lib.ts'
import type Spacetime from './spacetime.ts'
import type { SpacetimeInput } from '../types/index.ts'

const diffUnits = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond']
const compare = {
  diff(this: Spacetime, input: SpacetimeInput, unit?: string) {
    const other = this.set(input).goto(this.tz)
    if (!this.isValid() || !other.isValid()) {
      return NaN
    }
    const get = (name: string): number => {
      name = unitName(name)
      const scales: Record<string, [string, number]> = { quarter: ['month', 3], season: ['month', 3], decade: ['year', 10], century: ['year', 100], millennium: ['year', 1000], fortnight: ['week', 2] }
      const scale = scales[name]
      if (scale) {
        return Math.trunc(get(scale[0]) / scale[1])
      }
      if (!diffUnits.includes(name)) {
        return NaN
      }
      const largestUnit = name as Temporal.DateUnit | Temporal.TimeUnit
      return this._value.until(other._value, { largestUnit, smallestUnit: largestUnit, roundingMode: 'trunc' })[name + 's']
    }
    return unit ? get(unit) : Object.fromEntries(diffUnits.map((name) => [name + 's', get(name)]))
  },
  isSame(this: Spacetime, input: SpacetimeInput, unit?: string, tzAware = true) {
    if (!unit) {
      return null
    }
    if (typeof input === 'string' && typeof unit === 'object') {
      const date = unit
      unit = input
      input = date
    }
    if (!isBoundary(unit)) {
      return null
    }
    let other = this.set(input)
    if (tzAware) {
      other = other.goto(this.tz)
    }
    if (!this.isValid() || !other.isValid()) {
      return null
    }
    if (unitName(unit) === 'millisecond') {
      return this.epoch === other.epoch
    }
    return this.startOf(unit)._value.toPlainDateTime().equals(other.startOf(unit)._value.toPlainDateTime())
  },
  isBetween(this: Spacetime, start: SpacetimeInput, end: SpacetimeInput, inclusive = false) {
    if (!this.isValid() || !this.set(start).isValid() || !this.set(end).isValid()) {
      return null
    }
    if (inclusive) {
      return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end)
    }
    return this.isAfter(start) && this.isBefore(end)
  }
}
// compare two instants, by their nanosecond epochs
const operator = (compareFn: (a: bigint, b: bigint) => boolean) =>
  function (this: Spacetime, input: SpacetimeInput): boolean | null {
    const other = this.set(input)
    return this.isValid() && other.isValid() ? compareFn(this._value.epochNanoseconds, other._value.epochNanoseconds) : null
  }

export default {
  ...compare,
  isBefore: operator((a, b) => a < b),
  isAfter: operator((a, b) => a > b),
  isEqual: operator((a, b) => a === b)
}
