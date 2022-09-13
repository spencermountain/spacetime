import spacetime from '../../../src/index.js'

const fromJSDate = function (obj, year) {
  let d = new Date([year, obj.month, 1])
  let currentDay = d.getDay()
  // set to the right day eg 'monday'
  if (currentDay !== obj.day) {
    let distance = (obj.day + 7 - currentDay) % 7;
    d.setDate(1 + distance)
  }
  if (obj.num === 1) {
    return d
  }
  if (obj.num === 2) {
    d.setDate(d.getDate() + 7)
    return d
  }
  if (obj.num === 3) {
    d.setDate(d.getDate() + 14)
    return d
  }
  if (obj.num === 'last') {
    // get the last sunday in the month
    let m = d.getMonth()
    while (d.getMonth() === m) {
      d.setDate(d.getDate() + 7)
    }
    d.setDate(d.getDate() - 7)
  }
  return d
}

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const fromSpace = function (obj, tz, year) {
  let s = spacetime.now(tz).year(year).startOf('year')
  s = s.month(months[obj.month - 1])
  s = s.startOf('month')
  s = s.day(days[obj.day], true)
  if (obj.num === 2) {
    s = s.add(1, 'week')
  } else if (obj.num === 3) {
    s = s.add(2, 'week')
  } else if (obj.num === 'last') {
    s = s.endOf('month')
    s = s.day(obj.day, false)//roll backward
  }
  s = s.hour(obj.hour)
  return s
}
export { fromJSDate, fromSpace }