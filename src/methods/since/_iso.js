/*
ISO 8601 duration format
// https://en.wikipedia.org/wiki/ISO_8601#Durations
"P3Y6M4DT12H30M5S"
P the start of the duration representation.
Y the number of years.
M the number of months.
W the number of weeks.
D the number of days.
T of the representation.
H the number of hours.
M the number of minutes.
S the number of seconds.
*/

const fmt = (n) => Math.abs(n) || 0

const toISO = function (diff) {
  let iso = 'P'
  iso += fmt(diff.years) + 'Y'
  iso += fmt(diff.months) + 'M'
  iso += fmt(diff.days) + 'DT'
  iso += fmt(diff.hours) + 'H'
  iso += fmt(diff.minutes) + 'M'
  iso += fmt(diff.seconds) + 'S'
  return iso
}
export default toISO