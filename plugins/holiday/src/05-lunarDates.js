const spacetime = require('spacetime')
const holidays = require('./holidays/lunar-holidays')
// (lunar year is 354.36 days)
const dayDiff = -10.64

const lunarDates = function (str, normal, year, tz) {
  if (holidays.hasOwnProperty(str) || holidays.hasOwnProperty(normal)) {
    let date = holidays[str] || holidays[normal] || []
    if (!date) {
      return null
    }
    // start at 2018
    let s = spacetime(date + ' 2018', tz)
    let diff = year - 2018
    let toAdd = diff * dayDiff
    s = s.add(toAdd, 'day')
    s = s.startOf('day')

    // now set the correct year
    s = s.year(year)

    if (s.isValid()) {
      return s
    }
  }
  return null
}
module.exports = lunarDates
