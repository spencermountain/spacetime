// parse '+05:30' offset according to ISO8601 - 
//  could be +hh:mm, +hhmm or +hh
const reg = /^([+-])?([0-9]{1,2}):?([0-9]{2})?$/

//pull-apart ISO offsets, like "+0100"
const parseOffset = (str) => {
  // 'Zulu' is 0
  if (!str || str === 'Z' || str === 'z') {
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
  return 0

  //okay, try to match it to a utc timezone
  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
  // num *= -1
  // return num

  // if (num >= 0) {
  //   num = '+' + num
  // }
  // let tz = 'etc/gmt' + num
  // let zones = s.timezones
  // if (zones[tz]) {
  // log a warning if we're over-writing a given timezone?
  // console.log('changing timezone to: ' + tz)
  // s.tz = tz
  // }
  // return s
}
export default parseOffset
