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
    return input
  }
}
export default parse