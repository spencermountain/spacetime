import findTz from '../../../02-two/zones/tz.js'
import toCal from './toCal.js'
import isValid from './validate.js'

// import getEpoch from '../compute/epoch/index.js'


const isNumber = val => {
  return typeof val === 'number' && isFinite(val)
}


const parse = function (input, tz, world) {
  // reconcile timezone
  tz = world.methods.parseTz(tz, world)

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

  let cal = toCal(input, tz, world)
  // throw an error if input creates invalid date
  if (isValid(cal) === false) {
    throw new Error(`Error: invalid spacetime input: '${input}'`);
  }

  console.log(cal)

  // try to pull an tz off end of ISO-string
  if (!tz) {
    if (cal.offset) {
      let isoTz = world.methods.parseTz(cal.offset, world)
      if (world.zones.hasOwnProperty(isoTz)) {
        tz = isoTz
      }
    }
    tz = tz || world.methods.fallbackTz(world)
  }
  return { epoch: null, tz }

}
export default parse