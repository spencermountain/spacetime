import findTz from './find.ts'
import inSummerTime from './summerTime.ts'
import getDstShift from './dstShift.ts'
import titleCase from './titleCase.ts'
import type { Spacetime, TimezoneMeta } from '../types/index.ts'

//get metadata about this timezone
const timezone = (s: Spacetime): TimezoneMeta => {
  const zones = s.timezones
  let tz = s.tz
  if (zones.hasOwnProperty(tz) === false) {
    tz = findTz(s.tz, zones)
  }
  const found = zones[tz]
  const result: TimezoneMeta = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: { offset: found.offset, isDST: false }
  }
  if (result.hasDst) {
    const [start, back] = found.dst.split('->')
    result.change = { start, back }
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  const summer = found.offset // (july)
  let winter = summer // (january) assume it's the same for now
  const dstShift = getDstShift(tz)
  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - dstShift
    } else {
      //southern hemisphere
      winter = found.offset + dstShift
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (result.hasDst === false) {
    result.current.offset = summer
    result.current.isDST = false
  } else if (inSummerTime(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
    result.current.offset = summer
    result.current.isDST = result.hemisphere === 'North' //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    result.current.offset = winter
    result.current.isDST = result.hemisphere === 'South' //dst 'on' in summer in south
  }
  return result
}
export default timezone
