import isSummer from './summerTime.ts'
import dstShift from './dstShift.ts'
import type { Spacetime } from '../types/index.ts'

// this method avoids having to do a full dst-calculation on every operation
// it reproduces some things in ./index.ts, but speeds up spacetime considerably
const quickOffset = (s: Spacetime): number => {
  const zones = s.timezones
  const obj = zones[s.tz]
  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz) // eslint-disable-line no-console
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
  const [start, end] = obj.dst.split('->')
  const inSummer = isSummer(s.epoch, start, end, jul, dec)
  if (inSummer === true) {
    return jul
  }
  return dec
}
export default quickOffset
