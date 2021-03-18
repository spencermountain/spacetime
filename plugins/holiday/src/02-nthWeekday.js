const spacetime = require('spacetime')
const calendar = require('./holidays/calendar-holidays')

// holidays that are the same date every year
const fixedDates = function (str, normal, year, tz) {
  if (calendar.hasOwnProperty(str) || calendar.hasOwnProperty(normal)) {
    let arr = calendar[str] || calendar[normal] || []
    let s = spacetime.now(tz)
    s = s.year(year)

    // [3rd, 'monday', 'january']
    s = s.month(arr[2])
    s = s.startOf('month')
    // make it january
    let month = s.month()

    // make it the 1st monday
    s = s.day(arr[1])
    if (s.month() !== month) {
      s = s.add(1, 'week')
    }
    // make it nth monday
    if (arr[0] > 1) {
      s = s.add(arr[0] - 1, 'week')
    }
    if (s.isValid()) {
      return s
    }
  }

  return null
}
module.exports = fixedDates
