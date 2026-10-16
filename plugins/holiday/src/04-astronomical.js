import spacetime from 'spacetime'
import calcSeasons from './lib/seasons.js'
import holidays from './holidays/astro-holidays.js'

const astroDates = (str, normal, year, tz) => {
  const name = Object.hasOwn(holidays, str) ? str : normal
  if (!Object.hasOwn(holidays, name)) {
    return null
  }
  const events = calcSeasons(year)
  if (!events) {
    return null
  }
  // Convert the event instant before selecting its local calendar date.
  return spacetime(events[holidays[name]], tz).startOf('day')
}

export default astroDates
