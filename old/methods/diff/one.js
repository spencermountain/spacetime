//increment until dates are the same
const climb = (a, b, unit) => {
  let i = 0
  a = a.clone()
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit)
    i += 1
  }
  //oops, we went too-far..
  if (a.isAfter(b, unit)) {
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
