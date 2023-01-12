import months from '../_lib/months.js'

const isFloat = function (n) {
  return n !== undefined && Number(n) === n && n % 1 !== 0;
}

// ensure we haven't been given any silly numbers
const validate = function (cal) {
  Object.keys(cal).forEach(k => {
    // no decimals allowed
    if (isFloat(cal[k])) {
      cal[k] = parseInt(cal[k], 10)
    }
    // no negatives
    if (cal[k] < 0 && k !== 'year') {
      cal[k] = 0
    }
  })

  // set defaults
  cal.month = cal.month || 1 //co-erce any zeros to 1s
  cal.date = cal.date || 1 // (same)
  cal.hour = cal.hour || 0
  cal.minute = cal.minute || 0
  cal.second = cal.second || 0
  cal.millisecond = cal.millisecond || 0

  // range maximums
  if (cal.month && cal.month > 12) {
    cal.month = 12
  }
  if (cal.date && months[cal.month] && cal.date > months[cal.month].len) {
    cal.date = months[cal.month].len
  }
  if (cal.hour && cal.hour > 24) {
    cal.month = 24
  }
  if (cal.minute && cal.minute > 59) {
    cal.month = 59
  }
  if (cal.second && cal.second > 59) {
    cal.second = 59
  }
  if (cal.millisecond && cal.millisecond > 999) {
    cal.millisecond = 999
  }
  return cal
}
export default validate