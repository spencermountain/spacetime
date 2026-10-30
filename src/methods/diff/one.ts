//increment until dates are the same
const climb = (a, b, unit) => {
  let i = 0
  let next = a.clone()
  while (next.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    //count from the start each time, so a clamped month-end (jan 31 -> feb 28) doesn't carry over
    i += 1
    next = a.add(i, unit)
  }
  //oops, we went too-far..
  if (next.isAfter(b, unit)) {
    i -= 1
  }
  return i
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
