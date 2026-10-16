import spacetime from 'spacetime'
import fixedDates from './01-fixedDates.js'
import calendarDates from './02-nthWeekday.js'
import easterDates from './03-easterDates.js'
import astroDates from './04-astronomical.js'
import lunarDates from './05-lunarDates.js'
import { resolveName } from './_lib.js'

const resolvers = [fixedDates, calendarDates, easterDates, astroDates, lunarDates]
const lookup = (input, year, tz) => {
  const name = resolveName(input)
  if (!name) {
    return null
  }
  year = year ?? spacetime.now(tz).year()
  for (let i = 0; i < resolvers.length; i += 1) {
    const date = resolvers[i](name, name, year, tz, lookup)
    if (date !== null) {
      return date
    }
  }
  return null
}

export default lookup
