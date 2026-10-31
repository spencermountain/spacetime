import type { Spacetime } from '../../types/index.ts'

//get number of hours/minutes... between the two dates
function getDiff(a: Spacetime, b: Spacetime) {
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
    let next = earlier.add(max, unit)
    // a dst-fold can land the walk just-past the target - back off one
    if (next.isAfter(later)) {
      max -= 1
      next = earlier.add(max, unit)
    }
    earlier = next
    diff[unit] = max
  })
  // carry any full-12 months up into years
  if (diff.months >= 12) {
    diff.years += Math.trunc(diff.months / 12)
    diff.months = diff.months % 12
  }
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