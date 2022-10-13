import byYear from './data/byYear.js'
const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24

//https://www.timeanddate.com/date/leapyear.html
const isLeapYear = function (year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

const monthLengths = [
  31, //January - 31 days
  28, //February - 28 days in a common year and 29 days in leap years
  31, //March - 31 days
  30, //April - 30 days
  31, //May - 31 days
  30, //June - 30 days
  31, //July - 31 days
  31, //August - 31 days
  30, //September - 30 days
  31, //October - 31 days
  30, //November - 30 days
  31, //December - 31 days
];

const addMonths = function (months, year) {
  let ms = 0
  for (let i = 0; i < months - 1; i += 1) {
    let days = monthLengths[i]
    if (i === 1 && isLeapYear(year)) {
      days = 29
    }
    ms += days * DAY
  }
  return ms
}

const calc = function (obj, year, offset) {
  let epoch = byYear[String(year)]
  epoch += addMonths(obj.month, year)
  epoch += (obj.day || 0) * DAY
  epoch += (obj.hour || 0) * HOUR
  // let d = new Date(epoch)
  return epoch
}
// console.log(calc({ month: 3, day: 14, hour: 2 }, 2000))

export default calc