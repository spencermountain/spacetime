
//get number of hours/minutes... between the two dates
function getDiff(a, b) {
  const isBefore = a.isBefore(b)
  const later = isBefore ? b : a
  let earlier = isBefore ? a : b
  earlier = earlier.clone()
  const diff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  Object.keys(diff).forEach((unit) => {
    if (earlier.isSame(later, unit)) {
      return
    }
    let max = earlier.diff(later, unit)
    earlier = earlier.add(max, unit)
    diff[unit] = max
  })
  //reverse it, if necessary
  if (isBefore) {
    Object.keys(diff).forEach((u) => {
      if (diff[u] !== 0) {
        diff[u] *= -1
      }
    })
  }
  return diff
}
export default getDiff