/* eslint-disable no-console */
import isSummer from './summerTime.js'
import dstShift from './dstShift.js'

// this method avoids having to do a full dst-calculation on every operation
// it reproduces some things in ./index.js, but speeds up spacetime considerably
const quickOffset = s => {
  const zones = s.timezones
  const obj = zones[s.tz]
  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz)
    return 0
  }
  if (obj.dst === undefined) {
    return obj.offset
  }

  //get our two possible offsets
  const jul = obj.offset
  const shift = dstShift(s.tz)
  let dec = obj.offset + shift
  if (obj.hem === 'n') {
    dec = jul - shift
  }
  const split = obj.dst.split('->')
  const inSummer = isSummer(s.epoch, split[0], split[1], jul, dec)
  if (inSummer === true) {
    return jul
  }
  return dec
}
export default quickOffset
