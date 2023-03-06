import world from '../../world.js'
import getEpoch from '../compute/epoch/index.js'
// import zoneFile from '../../02-two/zones/index.js'
import findTz from './tz/index.js'
import { parseMonth } from './formats/units/index.js'


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
  // reconcile timezone
  tz = findTz(tz)

  // null means now
  if (input === null || input === undefined) {
    return { epoch: world.now.epoch(), tz }
  }
  // epoch input
  if (isNumber(input)) {
    // if the given epoch is really small, they've probably given seconds and not milliseconds
    if (world.config.minimumEpoch && input < world.config.minimumEpoch && input > 0) {
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
    if (cal.month) {
      cal.month = parseMonth(cal.month)
    }
    return { epoch: getEpoch(cal, tz), tz }
  }
  // given {year:2020 ...}
  if (input && isObject(input)) {
    // interpret a spacetime object as input
    if (input.isSpacetime === true) {
      return input.clone()
    }
    let cal = Object.assign({}, input)//don't mutate original
    return { epoch: getEpoch(cal, tz), tz }
  }
  // pull-apart ISO formats, etc
  if (isString(input)) {
    let cal = parseText(input)
    // replace tz with iso timezone
    if (cal.offset !== null && cal.offset !== undefined) {
      if (cal.offset < 0) {
        tz = `Etc/GMT+${Math.abs(cal.offset)}`
      } else {
        tz = `Etc/GMT-${cal.offset}`
      }
    }
    return { epoch: getEpoch(cal, tz), tz }
  }
  return {}
}
export default parse