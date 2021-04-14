const parseTime = (s, str = '') => {
  str = str.replace(/^\s+/, '').toLowerCase() //trim
  //formal time formats - 04:30.23
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/)
  if (arr !== null) {
    //validate it a little
    let h = Number(arr[1])
    if (h < 0 || h > 24) {
      return s.startOf('day')
    }
    let m = Number(arr[2]) //don't accept '5:3pm'
    if (arr[2].length < 2 || m < 0 || m > 59) {
      return s.startOf('day')
    }
    if(arr[4] > 999) { // fix overflow issue with milliseconds, if input is longer than standard (e.g. 2017-08-06T09:00:00.123456Z)
      arr[4] = parseInt(`${arr[4]}`.substring(0, 3), 10);
    }
    s = s.hour(h)
    s = s.minute(m)
    s = s.seconds(arr[3] || 0)
    s = s.millisecond(arr[4] || 0)
    //parse-out am/pm
    let ampm = str.match(/[\b0-9](am|pm)\b/)
    if (ampm !== null && ampm[1]) {
      s = s.ampm(ampm[1])
    }
    return s
  }
  //try an informal form - 5pm (no minutes)
  arr = str.match(/([0-9]+) ?(am|pm)/)
  if (arr !== null && arr[1]) {
    let h = Number(arr[1])
    //validate it a little..
    if (h > 12 || h < 1) {
      return s.startOf('day')
    }
    s = s.hour(arr[1] || 0)
    s = s.ampm(arr[2])
    s = s.startOf('hour')
    return s
  }
  //no time info found, use start-of-day
  s = s.startOf('day')
  return s
}
module.exports = parseTime
