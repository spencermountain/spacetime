import getDay from './getDay.js'

export default {
  // from https://www.timeanddate.com/date/leapyear.html
  isLeap: (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0),

  getDay: (cal) => getDay(cal.year, cal.month, cal.date),

  now: () => new Date().getTime(),

}