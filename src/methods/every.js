import { normalize } from '../fns.js'
import { short, long } from '../data/days.js'

//is it 'wednesday'?
const isDay = function (unit) {
  if (short().find((s) => s === unit)) {
    return true
  }
  if (long().find((s) => s === unit)) {
    return true
  }
  return false
}

// return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input
const every = function (start, unit, end, stepCount = 1) {
  if (!unit || !end) {
    return []
  }
  //cleanup unit param
  unit = normalize(unit)
  //cleanup to param
  end = start.clone().set(end)
  //swap them, if they're backwards
  if (start.isAfter(end)) {
    let tmp = start
    start = end
    end = tmp
  }
  //prevent going beyond end if unit/stepCount > than the range
  if (start.diff(end, unit) < stepCount) {
    return []
  }
  //support 'every wednesday'
  let d = start.clone()
  if (isDay(unit)) {
    d = d.next(unit)
    unit = 'week'
  } else {
    let first = d.startOf(unit)
    if (first.isBefore(start)) {
      d = d.next(unit)
    }
  }
  //okay, actually start doing it
  let result = []
  while (d.isBefore(end)) {
    result.push(d)
    d = d.add(stepCount, unit)
  }
  return result
}
export default every
