//pull-apart ISO offsets, like "+0100"
const parseOffset = (s, offset) => {
  if (!offset) {
    return s
  }
  offset = offset.trim().toLowerCase()
  if (offset === 'z') {
    s.tz = 'etc/gmt'
    return s
  }
  // Split hh:mm, hhmm or hh before converting minutes to fractional hours.
  const match = offset.match(/^([+-]?)([0-9]{2})(?::?([0-9]{2}))?$/)
  if (!match) {
    return s
  }
  const hours = Number(match[2])
  const minutes = Number(match[3] || 0)
  if (minutes > 59) {
    return s
  }
  let num = (hours + (minutes / 60)) * (match[1] === '-' ? -1 : 1)
  if (num === 0) {
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
  const tz = 'etc/gmt' + num
  const zones = s.timezones

  if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    s.tz = tz
  }
  return s
}
export default parseOffset
