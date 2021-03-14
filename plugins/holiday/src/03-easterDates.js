const holidays = require('./holidays/easter-holidays')
const spacetime = require('spacetime')
const calcEaster = require('./lib/calcEaster')

//calculate any holidays based on easter
const easterDates = function (str, normal, year, tz) {
  if (holidays.hasOwnProperty(str) || holidays.hasOwnProperty(normal)) {
    let days = holidays[str] || holidays[normal] || []

    let date = calcEaster(year)
    if (!date) {
      return null //no easter for this year
    }
    let e = spacetime(date, tz)
    e = e.year(year)

    let s = e.add(days, 'day')
    if (s.isValid()) {
      return s
    }
  }
  return null
}
module.exports = easterDates
