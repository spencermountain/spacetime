// approximate lengths of each unit, in milliseconds
// (dst and leap-years are supported post-hoc, by walking)
const millisecond = 1
const second = 1000
const minute = 60000
const hour = 3.6e6
const day = 8.64e7
const week = 6.048e8
const month = 8.64e7 * 29.5 //(average)
const year = 3.154e10

const ms = {
  millisecond,
  second,
  minute,
  hour,
  day,
  date: day,
  week,
  month,
  year,
  // plurals
  milliseconds: millisecond,
  seconds: second,
  minutes: minute,
  hours: hour,
  days: day,
  dates: day,
  weeks: week,
  months: month,
  years: year
}
export default ms
