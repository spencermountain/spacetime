import spacetime from 'spacetime'
import fixed from './holidays/fixed-holidays.js'

// holidays that are the same date every year
const fixedDates = function (str, normal, year, tz) {
  if (fixed.hasOwnProperty(str) || fixed.hasOwnProperty(normal)) {
    let arr = fixed[str] || fixed[normal] || []
    let s = spacetime.now(tz)
    s = s.year(year)
    s = s.startOf('year')
    s = s.month(arr[0])
    s = s.date(arr[1])
    if (s.isValid()) {
      return s
    }
  }
  return null
}
export default fixedDates
