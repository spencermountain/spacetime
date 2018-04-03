
//pull-apart ISO offsets, like "+0100"
const parseOffset = function(s, offset, givenTz) {
  if (!offset) {
    return s
  }
  //this is a fancy-move
  if (offset === 'Z') {
    offset = '+0000'
  }
  //support "+01:00"
  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '')
  }
  //support "+01:30"
  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '.5')
  }
  let num = parseInt(offset, 10)
  //divide by 100 or 10 - , "+0100", "+01"
  if (Math.abs(num) > 100) {
    num = num / 100
  }
  // console.log(offset, num)
  let current = s.timezone().current.offset
  if (current === num) { //we cool..
    return s
  }
  //okay, try to match it to a utc timezone
  if (num >= 0) {
    num = '+' + num
  }

  let tz = 'Etc/GMT' + num
  let zones = s.timezones
  if (zones[tz]) {
    // console.log('changing timezone to: ' + tz)
    //log a warning if we're over-writing a given timezone
    if (givenTz && zones[givenTz] && zones[givenTz].o !== zones[tz].o && s.silent === false) {
      //don't log during our tests, either..
      if (typeof process !== 'undefined' && process.env && !process.env.TESTENV) {
        console.warn('  - Setting timezone to: \'' + tz + '\'')
        console.warn('     from ISO string \'' + offset + '\'')
        console.warn('     overwriting given timezone: \'' + givenTz + '\'\n')
      }
    }
    s.tz = tz
  }
  return s
}
module.exports = parseOffset
