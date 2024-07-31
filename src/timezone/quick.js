/* eslint-disable no-console */
import isSummer from './summerTime.js'

// this method avoids having to do a full dst-calculation on every operation
// it reproduces some things in ./index.js, but speeds up spacetime considerably
const quickOffset = s => {
  let zones = s.timezones
  let obj = zones[s.tz]
  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz)
    return 0
  }
  if (obj.dst === undefined) {
    return obj.offset
  }

  //get our two possible offsets
  let jul = obj.offset
  let dec = obj.offset + 1 // assume it's the same for now
  if (obj.hem === 'n') {
    dec = jul - 1
  }
  let split = obj.dst.split('->')
  let inSummer = isSummer(s.epoch, split[0], split[1], jul, dec)
  if (inSummer === true) {
    return jul
  }
  return dec
}
export default quickOffset
