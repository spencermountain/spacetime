// truncate any sub-millisecond values
const parseMs = function (str = '') {
  str = String(str)
  //js does not support sub-millisecond values
  // so truncate these - 2021-11-02T19:55:30.087772
  if (str.length > 3) {
    str = str.substring(0, 3)
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
  str = str.trim().toLowerCase()
  if (!str) {
    return s.startOf('day')
  }
  //formal time format - 04:30.23
  let arr = str.match(/^([0-9]{1,2}):([0-9]{2})(?::([0-9]{1,2}))?(?:[:.]([0-9]+))?(?: ?(am|pm|gmt))?$/)
  if (arr !== null) {
    const [, hour, minute, sec, ms, suffix] = arr
    const h = Number(hour)
    const m = Number(minute)
    const ampm = suffix === 'am' || suffix === 'pm'
    // Reject invalid clock fields before setters clamp or roll them over.
    if (h > 23 || m > 59 || Number(sec || 0) > 59 || (ampm && (h < 1 || h > 12))) {
      s.epoch = null
      return s
    }
    s = s.hour(h)
    s = s.minute(m)
    s = s.seconds(sec || 0)
    s = s.millisecond(parseMs(ms))
    //parse-out am/pm
    if (ampm) {
      s = s.ampm(suffix)
    }
    return s
  }

  //try an informal form - 5pm (no minutes)
  arr = str.match(/^([0-9]{1,2}) ?(am|pm)$/)
  if (arr !== null && arr[1]) {
    const h = Number(arr[1])
    //validate it a little..
    if (h > 12 || h < 1) {
      s.epoch = null
      return s
    }
    s = s.hour(arr[1] || 0)
    s = s.ampm(arr[2])
    s = s.startOf('hour')
    return s
  }

  // An explicit but unrecognized time must not silently become midnight.
  s.epoch = null
  return s
}
export default parseTime
