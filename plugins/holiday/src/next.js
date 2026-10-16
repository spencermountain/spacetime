import spacetime from 'spacetime'
import lookup from './lookup.js'

const next = (name, options = {}) => {
  const from = options.from ?? Date.now()
  const timezone = options.timezone ?? from?.tz
  const input = from?.epoch ?? from
  const reference = spacetime(input, timezone).startOf('day')
  if (!reference.isValid()) {
    return null
  }
  // Holidays are calendar dates: today counts even after midnight.
  for (let year = reference.year(); year <= reference.year() + 1; year += 1) {
    const result = lookup(name, year, reference.tz)
    if (result && result.epoch >= reference.epoch) {
      return result
    }
  }
  return null
}

export default next
