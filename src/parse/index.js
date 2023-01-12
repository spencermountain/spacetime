import config from '../config.js'
import getEpoch from '../compute/get-epoch/index.js'
import zoneFile from '../../zonefile/iana.js'

// order for Array input
const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
import parseText from './text.js'

const isNumber = val => {
  return typeof val === 'number' && isFinite(val)
}

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const isString = val => {
  return typeof val === 'string'
}

const parse = function (input, tz) {
  // null means now
  if (input === null || input === undefined) {
    return config.now()
  }
  // epoch input
  if (isNumber(input)) {
    // if the given epoch is really small, they've probably given seconds and not milliseconds
    if (config.minimumEpoch && input < config.minimumEpoch && input > 0) {
      input *= 1000
    }
    return input
  }
  // support ordered array as input [2020, 04, 1] → {year:2020 ...}
  if (isArray(input)) {
    let cal = units.reduce((h, k, i) => {
      h[k] = input[i]
      return h
    }, {})
    return getEpoch(cal, tz)
  }
  // given {year:2020 ...}
  if (isObject(input)) {
    let cal = Object.assign({}, input)//don't mutate original
    return getEpoch(cal, tz)
  }
  // pull-apart ISO formats, etc
  if (isString(input)) {
    let cal = parseText(input)
    // get offset from ISO, or from given tz
    if (cal.offset === null || cal.offset === undefined) {
      cal.offset = (zoneFile[tz] || {}).offset || 0
    }
    return getEpoch(cal, tz)
  }
  return null
}
export default parse