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
  let now = getNow(tz, world)
  delete now.offset
  // if there's no year, assume current
  if (obj.year === undefined) {
    obj.year = now.year
  }
  // if there's a date, but no month, assume current
  // if (obj.date && obj.month === undefined) {
  // obj.month = now.month
  // }
  // otherwise, assume now, for missing values
  let cal = Object.assign({}, jan1, obj)
  return cal
}

const fromObject = function (obj, tz, world) {
  obj = Object.assign({}, obj)
  if (typeof obj.month === 'string') {
    obj.month = parseMonth(obj.month)
  }
  // support 'day' alias for 'date'
  if (obj.date === undefined && obj.day !== undefined) {
    obj.date = obj.day
    delete obj.day
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
  if (!obj) {
    return obj
  }
  return fillIn(obj, tz, world)
}


export { fromEpoch, fromObject, fromArray, fromText }