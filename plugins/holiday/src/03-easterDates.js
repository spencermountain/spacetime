import holidays from './holidays/easter-holidays.js'
import spacetime from 'spacetime'
import calcEaster from './lib/calcEaster.js'

//calculate any holidays based on easter
const easterDates = function (str, normal, year, tz) {
  if (holidays.hasOwnProperty(str) || holidays.hasOwnProperty(normal)) {
    const days = holidays[str] || holidays[normal] || []

    const date = calcEaster(year)
    if (!date) {
      return null //no easter for this year
    }
    let e = spacetime(date, tz)
    e = e.year(year)

    const s = e.add(days, 'day')
    if (s.isValid()) {
      return s
    }
  }
  return null
}
export default easterDates
