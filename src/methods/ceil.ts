import type { Spacetime, TimeUnit } from '../types/index.ts'

// round up to the next unit boundary
// a date already on a boundary stays put, so repeated calls never walk forward
const ceil = (s: Spacetime, unit: TimeUnit): Spacetime => {
  const lower = s.startOf(unit)
  // (an unknown unit, or invalid date, is also returned unchanged by startOf)
  if (!s.isValid() || lower.epoch === s.epoch) {
    return lower
  }
  // step forward and re-align, in case a dst change moved us off the boundary
  // one step is nearly always enough, but a repeated dst half-hour (lord howe)
  // can land back on the same boundary, so allow a second
  let upper = lower
  for (let i = 1; i <= 3 && upper.epoch <= s.epoch; i += 1) {
    upper = lower.add(i, unit).startOf(unit)
  }
  return upper.epoch > s.epoch ? upper : lower.add(1, unit)
}

export default ceil
