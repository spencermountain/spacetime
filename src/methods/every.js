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
  if (!unit || !end || !Number.isInteger(stepCount) || stepCount <= 0) {
    return []
  }
  //cleanup unit param
  unit = normalize(unit)
  //cleanup to param
  end = start.clone().set(end)
  if (!start.isValid() || !end.isValid()) {
    return []
  }
  //swap them, if they're backwards
  if (start.isAfter(end)) {
    const tmp = start
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
    const first = d.startOf(unit)
    if (first.isBefore(start)) {
      d = d.next(unit)
    }
  }
  //okay, actually start doing it
  const result = []
  for (; d.isBefore(end);) {
    result.push(d)
    const next = d.add(stepCount, unit)
    // Stop if arithmetic cannot advance the cursor.
    if (!next.isValid() || next.epoch <= d.epoch) {
      break
    }
    d = next
  }
  return result
}
export default every
