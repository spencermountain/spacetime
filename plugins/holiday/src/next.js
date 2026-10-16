import spacetime from 'spacetime'
import lookup from './lookup.js'
import { resolveName } from './_lib.js'
import { lunarOccurrences } from './05-lunarDates.js'

const next = (name, options = {}) => {
  name = resolveName(name)
  if (!name) {
    return null
  }
  const from = options.from ?? Date.now()
  const timezone = options.timezone ?? from?.tz
  const input = from?.epoch ?? from
  const reference = spacetime(input, timezone).startOf('day')
  if (!reference.isValid()) {
    return null
  }
  // Holidays are calendar dates: today counts even after midnight.
  for (let year = reference.year(); year <= reference.year() + 1; year += 1) {
    let candidates = lunarOccurrences(name, year, reference.tz)
    if (candidates.length === 0) {
      candidates = [lookup(name, year, reference.tz)]
    }
    for (const result of candidates) {
      if (result && result.epoch >= reference.epoch) {
        return result
      }
    }
  }
  return null
}

export default next
