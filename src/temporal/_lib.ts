import { mapping } from '../data/months.ts'
import type Spacetime from './spacetime.ts'
import type { Spacetime as MainSpacetime, DateParts } from '../types/index.ts'

/** a partial set of wall-clock fields, for Temporal's .with() / .from() */
export type ClockFields = Temporal.PartialTemporalLike<Temporal.ZonedDateTimeLikeObject>

// the main library's format/parseTime helpers only use the clock getters and setters,
// which this class shares with the main one
export const asMain = (s: Spacetime): MainSpacetime => s as unknown as MainSpacetime

const clockField = (s: Spacetime, field: string, fallback: number | boolean = NaN) => {
  const clock = s._clock
  const value = clock == null ? undefined : clock[field]
  return value == null ? fallback : value
}

const fields = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
const temporal = () => {
  if (typeof globalThis === 'undefined' || !globalThis.Temporal) {
    throw new Error('spacetime/temporal requires native Temporal (or a globally installed polyfill)')
  }
  return globalThis.Temporal
}

const unitName = (unit: unknown = ''): string => {
  if (typeof unit !== 'string') {
    return ''
  }
  const name = unit.trim().toLowerCase().replace(/ies$/, 'y').replace(/s$/, '').replace(/-/g, '')
  return { date: 'day', min: 'minute' }[name] || name
}

const duration = (amount: number, unit: string): Temporal.DurationLike | null => {
  unit = unitName(unit)
  const scales = { quarter: ['month', 3], decade: ['year', 10], century: ['year', 100], millennium: ['year', 1000], quarterhour: ['minute', 15], fortnight: ['week', 2], weekend: ['week', 1], season: ['month', 3] }
  if (scales[unit]) {
    amount *= scales[unit][1]
    unit = scales[unit][0]
  }
  // Temporal durations require integers; retain fractional clock arithmetic.
  const clock = { hour: 3600000, minute: 60000, second: 1000, millisecond: 1 }
  if (unit === 'millisecond' && !Number.isInteger(amount)) {
    return { nanoseconds: Math.round(amount * 1000000) }
  }
  if (clock[unit]) {
    return { milliseconds: Math.trunc(amount * clock[unit]) }
  }
  if (['year', 'month', 'week', 'day'].includes(unit)) {
    return { [unit + 's']: amount }
  }
  return null
}

const fieldNumber = (value: number | string, field: string): number => {
  if (typeof value === 'string') {
    value = value.trim().toLowerCase()
    if (field === 'month' && Object.prototype.hasOwnProperty.call(mapping(), value)) {
      return mapping()[value]
    }
    value = value.replace(/(st|nd|rd|th)$/, '')
  }
  return Number(value)
}

const direction = (result: Spacetime, original: Spacetime, forward: boolean | undefined, unit: string): Spacetime => {
  if (forward === true && result.epoch < original.epoch) {
    return result.add(1, unit)
  }
  if (forward === false && result.epoch > original.epoch) {
    return result.subtract(1, unit)
  }
  return result
}

const fieldValues = (input: DateParts | Record<string, unknown>): ClockFields => {
  const out: Record<string, number> = {}
  fields.forEach((field) => {
    if (input[field] !== undefined && input[field] !== null) {
      const name = field === 'date' ? 'day' : field
      out[name] = fieldNumber(input[field], field)
      if (field === 'month') {
        out[name] += 1
      }
    }
  })
  return out
}

const boundaryUnits = ['millisecond', 'second', 'minute', 'quarterhour', 'hour', 'day', 'week', 'month', 'quarter', 'year', 'decade', 'century', 'millennium']
const isBoundary = (unit: unknown): boolean => boundaryUnits.includes(unitName(unit))

export { clockField, isBoundary, fields, temporal, unitName, duration, fieldValues, fieldNumber, direction }
