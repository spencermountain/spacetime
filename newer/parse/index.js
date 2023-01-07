import config from '../config.js'

const isNumber = val => {
  return typeof val === 'number' && isFinite(val)
}

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const parse = function (input) {
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
}
export default parse