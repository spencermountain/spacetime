const fields = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
const temporal = () => {
  if (!globalThis.Temporal) {
    throw new Error('spacetime/temporal requires native Temporal (or a globally installed polyfill)')
  }
  return globalThis.Temporal
}

const unitName = (unit = '') => {
  const name = unit.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '').replace(/-/g, '')
  return { date: 'day', min: 'minute' }[name] || name
}

const duration = (amount, unit) => {
  unit = unitName(unit)
  const scales = { quarter: ['month', 3], decade: ['year', 10], century: ['year', 100], millennium: ['year', 1000], quarterhour: ['minute', 15] }
  if (scales[unit]) {
    amount *= scales[unit][1]
    unit = scales[unit][0]
  }
  // Temporal durations require integers; retain fractional clock arithmetic.
  const clock = { hour: 3600000, minute: 60000, second: 1000, millisecond: 1 }
  if (clock[unit]) {
    return { milliseconds: Math.trunc(amount * clock[unit]) }
  }
  return { [unit + 's']: amount }
}

const fieldValues = (input) => {
  const out = {}
  fields.forEach((field) => {
    if (input[field] !== undefined) {
      const name = field === 'date' ? 'day' : field
      out[name] = Number(input[field])
      if (field === 'month') {
        out[name] += 1
      }
    }
  })
  return out
}

export { fields, temporal, unitName, duration, fieldValues }
