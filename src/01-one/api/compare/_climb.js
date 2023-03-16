//increment until dates are the same
const climb = (a, b, unit) => {
  // do fast-mode for these units
  if (unit === 'milliseconds') {
    return b.epoch - a.epoch
  }
  if (unit === 'seconds') {
    return Math.floor((b.epoch - a.epoch) / 1000)
  }
  if (unit === 'minutes') {
    return Math.floor((b.epoch - a.epoch) / (1000 * 60))
  }
  // slow-mode for these units
  let n = 0
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit)
    n += 1
  }
  //oops, we went too-far..
  if (a.isAfter(b, unit)) {
    n -= 1
  }
  return n
}

// do a thurough +=1 on the unit, until they match
// for speed-reasons, only used on day, month, week.
const diffOne = (a, b, unit) => {
  if (a.isBefore(b)) {
    return climb(a, b, unit)
  } else {
    return climb(b, a, unit) * -1 //reverse it
  }
}

export default diffOne
