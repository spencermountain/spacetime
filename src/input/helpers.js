/* eslint-disable no-console */
const defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}
const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']

//support [2016, 03, 01] format
const parseArray = (s, arr, today) => {
  if (arr.length === 0) {
    return s
  }
  for (let i = 0; i < units.length; i++) {
    let num = arr[i] || today[units[i]] || defaults[units[i]] || 0
    s = s[units[i]](num)
  }
  return s
}

//support {year:2016, month:3} format
const parseObject = (s, obj) => {
  if (Object.keys(obj).length === 0) {
    return s
  }
  obj = Object.assign({}, defaults, obj)
  if (obj.timezone) {
    s.tz = obj.timezone
  }
  for (let i = 0; i < units.length; i++) {
    let unit = units[i]
    if (obj[unit] !== undefined) {
      s = s[unit](obj[unit])
    }
  }
  return s
}

// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so
const parseNumber = function (s, input) {
  const minimumEpoch = 2500000000
  // if the given epoch is really small, they've probably given seconds and not milliseconds
  // anything below this number is likely (but not necessarily) a mistaken input.
  if (input > 0 && input < minimumEpoch && s.silent === false) {
    console.warn('  - Warning: You are setting the date to January 1970.')
    console.warn('       -   did input seconds instead of milliseconds?')
  }
  s.epoch = input
  return s
}

export default {
  parseArray,
  parseObject,
  parseNumber
}
