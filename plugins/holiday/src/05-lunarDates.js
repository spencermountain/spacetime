import spacetime from 'spacetime'
import holidays from './holidays/lunar-holidays.js'
import occurrences from './lib/islamic.js'

const lunarOccurrences = (name, year, tz) => {
  if (!Object.hasOwn(holidays, name)) {
    return []
  }
  const [month, day] = holidays[name]
  return occurrences(year, month, day).map((date) => spacetime(date, tz).startOf('day'))
}

// The singular lookup returns the first occurrence in the Gregorian year.
const lunarDates = (str, normal, year, tz) => {
  const name = Object.hasOwn(holidays, str) ? str : normal
  return lunarOccurrences(name, year, tz)[0] ?? null
}

export { lunarOccurrences }
export default lunarDates
