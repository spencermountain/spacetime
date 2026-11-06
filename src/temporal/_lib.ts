import { mapping } from '../data/months.ts'
import type Spacetime from './spacetime.ts'
import type { Spacetime as MainSpacetime, DateParts } from '../types/index.ts'
import type { Unit, Units, DateFields } from '../../types/temporal-types.js'

/** a partial set of wall-clock fields, for Temporal's .with() / .from() */
export type ClockFields = Temporal.PartialTemporalLike<Temporal.ZonedDateTimeLikeObject>

// the main library's format/parseTime helpers only use the clock getters and setters,
// which this class shares with the main one
export const asMain = (s: Spacetime): MainSpacetime => s as unknown as MainSpacetime

const clockField = <T extends number | boolean = number>(s: Spacetime, field: string, fallback: T = NaN as T): T => {
  const clock = s._clock as unknown as Record<string, number | boolean> | null
  const value = clock == null ? undefined : clock[field]
  return value == null ? fallback : (value as T)
}

const fields: (keyof DateParts)[] = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
const temporal = () => {
  if (typeof globalThis === 'undefined' || !globalThis.Temporal) {
    throw new Error('spacetime/temporal requires native Temporal (or a globally installed polyfill)')
  }
  return globalThis.Temporal
}

// (unknown units pass through unchanged; the caller warns or ignores them)
const unitName = (unit: unknown = ''): Unit | '' => {
  if (typeof unit !== 'string') {
    return ''
  }
  const name = unit.trim().toLowerCase().replace(/ies$/, 'y').replace(/s$/, '').replace(/-/g, '')
  const synonyms: Record<string, Unit> = { date: 'day', min: 'minute' }
  return synonyms[name] || (name as Unit)
}

const duration = (amount: number, unit: string): Temporal.DurationLike | null => {
  let name: string = unitName(unit)
  const scales: Record<string, [string, number]> = { quarter: ['month', 3], decade: ['year', 10], century: ['year', 100], millennium: ['year', 1000], quarterhour: ['minute', 15], fortnight: ['week', 2], weekend: ['week', 1], season: ['month', 3] }
  if (scales[name]) {
    amount *= scales[name][1]
    name = scales[name][0]
  }
  // Temporal durations require integers; retain fractional clock arithmetic.
  const clock: Record<string, number> = { hour: 3600000, minute: 60000, second: 1000, millisecond: 1 }
  if (name === 'millisecond' && !Number.isInteger(amount)) {
    return { nanoseconds: Math.round(amount * 1000000) }
  }
  if (clock[name]) {
    return { milliseconds: Math.trunc(amount * clock[name]) }
  }
  if (['year', 'month', 'week', 'day'].includes(name)) {
    return { [name + 's']: amount }
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

const direction = (result: Spacetime, original: Spacetime, forward: boolean | undefined, unit: Units): Spacetime => {
  if (forward === true && result.epoch < original.epoch) {
    return result.add(1, unit)
  }
  if (forward === false && result.epoch > original.epoch) {
    return result.subtract(1, unit)
  }
  return result
}

/** options.today as numbers (month names become indexes), like the main library keeps it */
const toParts = (today: DateFields = {}): DateParts => {
  const out: Record<string, number> = {}
  const input = today as Record<string, string | number | null | undefined>
  fields.forEach((field) => {
    if (input[field] !== undefined && input[field] !== null) {
      out[field] = fieldNumber(input[field], field)
    }
  })
  return out
}

const fieldValues = (parts: DateParts | DateFields | Record<string, unknown>): ClockFields => {
  const input = parts as Record<string, number | string | undefined | null>
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

export { clockField, isBoundary, fields, temporal, unitName, duration, fieldValues, fieldNumber, direction, toParts }
