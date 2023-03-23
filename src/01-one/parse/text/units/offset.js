// parse '+05:30' offset according to ISO8601 - 
//  could be +hh:mm, +hhmm or +hh
const reg = /^([+-])?([0-9]{1,2}):?([0-9]{2})?$/

//pull-apart ISO offsets, like "+0100"
const parseOffset = (str) => {
  if (!str) {
    return null
  }
  // 'Zulu' is 0
  if (str === 'Z' || str === 'z') {
    return 0
  }
  // tokenize it
  let m = str.match(reg)
  if (m !== null) {
    let [, plus, hour, min] = m
    hour = parseInt(hour || '', 10) || 0
    min = parseInt(min || '', 10) || 0

    // turn minutes into decimal - 30 -> 0.5
    min = min / 60

    let offset = hour + min

    // handle negative
    if (plus === '-') {
      offset *= -1
    }
    return offset
  }
  return null
}
export default parseOffset
