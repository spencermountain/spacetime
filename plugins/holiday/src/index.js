import spacetime from 'spacetime'
import fixedDates from './01-fixedDates.js'
import nthWeekday from './02-nthWeekday.js'
import easterDates from './03-easterDates.js'
import astroDates from './04-astronomical.js'
import lunarDates from './05-lunarDates.js'
const nowYear = spacetime.now().year()

const spacetimeHoliday = function (str, year, tz) {
  year = year || nowYear
  str = str || ''
  str = String(str)
  str = str.trim().toLowerCase()
  str = str.replace(/'s/, 's') // 'mother's day'

  let normal = str.replace(/ day$/, '')
  normal = normal.replace(/^the /, '')
  normal = normal.replace(/^orthodox /, '') //orthodox good friday

  // try easier, unmoving holidays
  let s = fixedDates(str, normal, year, tz)
  if (s !== null) {
    return s
  }
  // try 'nth monday' holidays
  s = nthWeekday(str, normal, year, tz)
  if (s !== null) {
    return s
  }
  // easter-based holidays
  s = easterDates(str, normal, year, tz)
  if (s !== null) {
    return s
  }
  // solar-based holidays
  s = astroDates(str, normal, year, tz)
  if (s !== null) {
    return s
  }
  // mostly muslim holidays
  s = lunarDates(str, normal, year, tz)
  if (s !== null) {
    return s
  }

  return null
}
export default spacetimeHoliday
