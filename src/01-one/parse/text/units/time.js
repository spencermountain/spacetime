import parseHour from './hour.js'

const startOfDay = {
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
}


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

const parseTime = (str = '', obj) => {
  obj = Object.assign({}, startOfDay, obj)
  // remove all whitespace
  str = str.replace(/^\s+/, '').toLowerCase()
  //formal time format - 04:30.23
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:.]?([0-9]{1,4})?/)
  if (arr !== null) {
    //validate it a little
    let h = Number(arr[1])
    if (h < 0 || h > 24) {
      return obj
    }
    let m = Number(arr[2]) //don't accept '5:3pm'
    if (arr[2].length < 2 || m < 0 || m > 59) {
      return obj
    }
    obj.hour = h
    obj.minute = m
    obj.second = Number(arr[3]) || 0
    obj.millisecond = parseMs(arr[4])
    //parse-out am/pm
    let ampm = str.match(/[\\b0-9] ?(am|pm)\b/)
    if (ampm !== null && ampm[1] === 'pm') {
      obj.hour += 12
    }
    return obj
  }

  // parse hour-only times
  let h = parseHour(str)
  if (h !== null) {
    obj.hour = h
  }
  return obj
}
export default parseTime
