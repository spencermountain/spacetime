//pull-apart ISO offsets, like "+0100"
const parseOffset = (s, offset) => {
  if (!offset) {
    return s
  }
  offset = offset.trim().toLowerCase()
  // according to ISO8601, tz could be hh:mm, hhmm or hh
  // so need few more steps before the calculation.
  let num = 0

  // for (+-)hh:mm
  if (/^[+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
    //support "+01:00"
    if (/:00/.test(offset) === true) {
      offset = offset.replace(/:00/, '')
    }
    //support "+01:30"
    if (/:30/.test(offset) === true) {
      offset = offset.replace(/:30/, '.5')
    }
  }

  // for (+-)hhmm
  if (/^[+-]?[0-9]{4}$/.test(offset)) {
    offset = offset.replace(/30$/, '.5')
  }
  num = parseFloat(offset)

  //divide by 100 or 10 - , "+0100", "+01"
  if (Math.abs(num) > 100) {
    num = num / 100
  }
  //this is a fancy-move
  if (num === 0 || offset === 'Z' || offset === 'z') {
    s.tz = 'etc/gmt'
    return s
  }
  //okay, try to match it to a utc timezone
  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
  num *= -1

  if (num >= 0) {
    num = '+' + num
  }
  let tz = 'etc/gmt' + num
  let zones = s.timezones

  if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    s.tz = tz
  }
  return s
}
export default parseOffset
