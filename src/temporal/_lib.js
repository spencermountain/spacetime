import { mapping } from '../data/months.js'

const fields = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
const temporal = () => {
  if (!globalThis.Temporal) {
    throw new Error('spacetime/temporal requires native Temporal (or a globally installed polyfill)')
  }
  return globalThis.Temporal
}

const unitName = (unit = '') => {
  if (typeof unit !== 'string') {
    return ''
  }
  const name = unit.trim().toLowerCase().replace(/ies$/, 'y').replace(/s$/, '').replace(/-/g, '')
  return { date: 'day', min: 'minute' }[name] || name
}

const duration = (amount, unit) => {
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

const fieldNumber = (value, field) => {
  if (typeof value === 'string') {
    value = value.trim().toLowerCase()
    if (field === 'month' && Object.hasOwn(mapping(), value)) {
      return mapping()[value]
    }
    value = value.replace(/(st|nd|rd|th)$/, '')
  }
  return Number(value)
}

const direction = (result, original, forward, unit) => {
  if (forward === true && result.epoch < original.epoch) {
    return result.add(1, unit)
  }
  if (forward === false && result.epoch > original.epoch) {
    return result.subtract(1, unit)
  }
  return result
}

const fieldValues = (input) => {
  const out = {}
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
const isBoundary = unit => boundaryUnits.includes(unitName(unit))

export { isBoundary, fields, temporal, unitName, duration, fieldValues, fieldNumber, direction }
