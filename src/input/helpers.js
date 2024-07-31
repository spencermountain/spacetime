/* eslint-disable no-console */
const defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}

//support [2016, 03, 01] format
const parseArray = (s, arr, today) => {
  if (arr.length === 0) {
    return s
  }
  let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
  for (let i = 0; i < order.length; i++) {
    let num = arr[i] || today[order[i]] || defaults[order[i]] || 0
    s = s[order[i]](num)
  }
  return s
}

//support {year:2016, month:3} format
const parseObject = (s, obj, today) => {
  // if obj is empty, do nothing
  if (Object.keys(obj).length === 0) {
    return s
  }
  obj = Object.assign({}, defaults, today, obj)
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i]
    //make sure we have this method
    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue
    }
    //make sure the value is a number
    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue
    }
    let num = obj[unit] || today[unit] || defaults[unit] || 0
    s = s[unit](num)
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
