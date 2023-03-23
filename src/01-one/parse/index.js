import isValid from './validate.js'
import { fromEpoch, fromArray, fromObject, fromText } from './formats.js'
import parseTz from './timezone/parseTz.js'

const isNumber = val => typeof val === 'number' && isFinite(val)
const isObject = val => Object.prototype.toString.call(val) === '[object Object]'
const isArray = (arr) => Object.prototype.toString.call(arr) === '[object Array]'
const isString = val => typeof val === 'string'


const parse = function (input, tz, world) {
  // no input means now
  if (input === null || input === undefined) {
    return { epoch: world.methods.now(), tz }
  }
  // pull-apart input into calendar object
  let cal = {}
  if (isNumber(input)) {
    return fromEpoch(input, tz, world)
  }
  if (isArray(input)) {
    cal = fromArray(input, tz, world)
  } else if (isObject(input)) {
    // interpret a spacetime object as input
    if (input.isSpacetime === true) {
      return input.clone()
    }
    cal = fromObject(input, tz, world)
  } else if (isString(input)) {
    cal = fromText(input, tz, world)
  }
  // throw an error if input creates invalid date
  if (isValid(cal) === false) {
    if (world.config.throwUnparsedDate) {
      // console.error(`Error: invalid spacetime input: '${input}'`)
      // console.error(JSON.stringify(cal, null, 2))
      let err = new Error('InvalidDate');
      err.type = 'InvalidDate'
      throw err
    }
    //fallback to now
    cal = fromObject({}, tz, world)
  }

  // try to pull an tz off end of ISO-string
  if (!tz) {
    tz = parseTz(cal.offset, world) || world.methods.fallbackTz(world)
  }
  let epoch = world.methods.getEpoch(cal, tz, world)
  return { epoch, tz }
}
export default parse