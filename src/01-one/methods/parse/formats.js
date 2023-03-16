import { parseMonth, parseDate } from './text/units/index.js'
import parseText from './text/index.js'
const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']

const jan1 = {
  month: 1,
  date: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
}

const getNow = function (tz, world) {
  const { methods } = world
  let epoch = methods.now()
  return methods.getCal(epoch, tz, world)
}

const isNumber = val => {
  return typeof val === 'number'// && isFinite(val)
}

// 
const fillIn = function (obj, tz, world) {
  // assume jan 1?
  if (isNumber(obj.year)) {
    return Object.assign({}, jan1, obj)
  }
  // if we have any time properties, zero out the rest
  if (isNumber(obj.hour) || isNumber(obj.minute) || isNumber(obj.second)) {
    obj.minute = obj.minute || 0
    obj.second = obj.second || 0
    obj.millisecond = obj.millisecond || 0
  }
  // if there's no year, assume ours
  let now = getNow(tz, world)
  // otherwise, assume now, for missing values
  let cal = Object.assign({}, now, obj)
  return cal
}

const fromObject = function (obj, tz, world) {
  if (typeof obj.month === 'string') {
    obj.month = parseMonth(obj.month)
  }
  if (typeof obj.date === 'string') {
    obj.date = parseDate(obj.date)
  }
  let cal = fillIn(obj, tz, world)
  return cal
}

const fromEpoch = function (input, tz, world) {
  // if the given epoch is really small, they've probably given seconds and not milliseconds
  if (world.config.minimumEpoch && input < world.config.minimumEpoch && input > 0) {
    input *= 1000
  }
  return { epoch: input, tz }
}


const fromArray = function (arr, tz, world) {
  let obj = arr.reduce((h, n, i) => {
    h[units[i]] = n
    return h
  }, {})
  return fromObject(obj, tz, world)
}

const fromText = function (txt, tz, world) {
  let obj = parseText(txt, tz)
  let cal = fillIn(obj, tz, world)
  return cal
}


export { fromEpoch, fromObject, fromArray, fromText }