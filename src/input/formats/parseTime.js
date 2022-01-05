// truncate any sub-millisecond values
const parseMs = function (str = '') {
  str = String(str)
  //js does not support sub-millisecond values 
  // so truncate these - 2021-11-02T19:55:30.087772
  if (str.length > 3) {
    str = str.substr(0, 3)
  } else if (str.length === 1) {
    // assume ms are zero-padded on the left
    // but maybe not on the right.
    // turn '.10' into '.100'
    str = str + '00'
  } else if (str.length === 2) {
    str = str + '0'
  }
  return Number(str) || 0
}

const parseTime = (s, str = '') => {
  // remove all whitespace
  str = str.replace(/^\s+/, '').toLowerCase()
  //formal time format - 04:30.23
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
    s = s.hour(h)
    s = s.minute(m)
    s = s.seconds(arr[3] || 0)
    s = s.millisecond(parseMs(arr[4]))
    //parse-out am/pm
    let ampm = str.match(/[\b0-9] ?(am|pm)\b/)
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
export default parseTime
