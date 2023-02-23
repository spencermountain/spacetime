import config from '../config.js'
import getEpoch from '../compute/epoch/index.js'
import zoneFile from '../zones/index.js'

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
    return { epoch: config.now(), tz }
  }
  // epoch input
  if (isNumber(input)) {
    // if the given epoch is really small, they've probably given seconds and not milliseconds
    if (config.minimumEpoch && input < config.minimumEpoch && input > 0) {
      input *= 1000
    }
    return { epoch: input, tz }
  }
  // support ordered array as input [2020, 04, 1] → {year:2020 ...}
  if (isArray(input)) {
    let cal = units.reduce((h, k, i) => {
      h[k] = input[i]
      return h
    }, {})
    return { epoch: getEpoch(cal, tz), tz }
  }
  // given {year:2020 ...}
  if (isObject(input)) {
    let cal = Object.assign({}, input)//don't mutate original
    return { epoch: getEpoch(cal, tz), tz }
  }
  // pull-apart ISO formats, etc
  if (isString(input)) {
    let cal = parseText(input)
    // get offset from ISO, or from given tz
    if (cal.offset === null || cal.offset === undefined) {
      cal.offset = (zoneFile[tz] || {}).offset || 0
    } else if (!tz) {
      // generate a tz from the iso-offset
      let num = cal.offset < 0 ? `+${Math.abs(cal.offset)}` : `+${cal.offset}`
      tz = `Etc/GMT${num}`
    }
    return { epoch: getEpoch(cal, tz), tz }
  }
  return {}
}
export default parse