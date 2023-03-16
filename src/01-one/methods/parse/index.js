import isValid from './validate.js'
import { fromEpoch, fromArray, fromObject, fromText } from './formats.js'


const isNumber = val => typeof val === 'number' && isFinite(val)
const isObject = val => Object.prototype.toString.call(val) === '[object Object]'
const isArray = (arr) => Object.prototype.toString.call(arr) === '[object Array]'
const isString = val => typeof val === 'string'

const guessTz = function (cal) {
  // replace tz with iso timezone
  if (cal.offset !== null && cal.offset !== undefined) {
    if (cal.offset < 0) {
      return `Etc/GMT+${Math.abs(cal.offset)}`
    } else {
      return `Etc/GMT-${cal.offset}`
    }
  }
  return null
}

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
  if (isValid(cal) === false && world.config.throwUnparsedDate) {
    console.error(`Error: invalid spacetime input: '${input}'`)
    console.error(JSON.stringify(cal, null, 2))
    throw new Error('InvalidDate');
  }

  // try to pull an tz off end of ISO-string
  if (!tz) {
    tz = guessTz(cal) || world.methods.fallbackTz(world)
  }
  let epoch = world.methods.getEpoch(cal, tz, world)
  return { epoch, tz }

}
export default parse