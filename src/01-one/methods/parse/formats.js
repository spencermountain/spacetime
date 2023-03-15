import { parseMonth } from './text/units/index.js'

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

const fromObject = function (obj, tz, world) {
  // if there's no year, assume ours
  if (!obj.year && obj.year !== 0) {
    let now = getNow(tz, world)
    obj.year = now.year
  }
  // otherwise, assume now, for missing values
  let cal = Object.assign({}, jan1, obj)
  cal.month = parseMonth(cal.month)
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

export { fromEpoch, fromObject, fromArray }