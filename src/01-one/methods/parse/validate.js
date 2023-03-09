const isValid = function (cal, tz, world) {
  // required fields
  if (!cal.year && !cal.year === 0) {
    return false
  }
  if (!cal.month || cal.month < 1 || cal.month > 12) {
    return false
  }
  if (!cal.date || cal.date < 1 || cal.date > 31) {
    return false
  }
  // non-required fields
  if (cal.hour && cal.hour < 0 && cal.hour > 24) {
    return false
  }
  if (cal.minute && cal.minute < 0 && cal.minute > 60) {
    return false
  }
  if (cal.second && cal.second < 0 && cal.second > 60) {
    return false
  }
  if (cal.millisecond && cal.millisecond < 0 && cal.millisecond > 1000) {
    return false
  }
  return true
}
export default isValid