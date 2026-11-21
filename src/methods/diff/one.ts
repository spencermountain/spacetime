import type { Spacetime, TimeUnit } from '../../types/index.ts'

// do a thorough +=1 on the unit, until we reach the later date
// for speed-reasons, only used on day, month, week.
// `from` is a head-start - a count that's already known to be close
const diffOne = (a: Spacetime, b: Spacetime, unit: TimeUnit, from = 0): number => {
  let i = from
  //do proper, expensive increment to catch all-the-tricks
  //always count from the original date, so a clamped month-end (jan 31 -> feb 28) doesn't carry over
  let next = a.add(i, unit)
  while (next.isBefore(b)) {
    i += 1
    next = a.add(i, unit)
  }
  //oops, we went too-far..
  while (i > 0 && next.isAfter(b)) {
    i -= 1
    next = a.add(i, unit)
  }
  return i
}

export default diffOne
