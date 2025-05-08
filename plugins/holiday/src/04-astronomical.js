import spacetime from 'spacetime'
import calcSeasons from './lib/seasons.js'
import holidays from './holidays/astro-holidays.js'

const astroDates = function (str, normal, year, tz) {
  if (holidays.hasOwnProperty(str) || holidays.hasOwnProperty(normal)) {
    const season = holidays[str] || holidays[normal]
    const seasons = calcSeasons(year)
    if (!season || !seasons || !seasons[season]) {
      return null // couldn't figure it out
    }
    const s = spacetime(seasons[season], tz)
    if (s.isValid()) {
      return s
    }
  }

  return null
}
export default astroDates
