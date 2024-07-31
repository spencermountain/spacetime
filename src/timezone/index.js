/* eslint-disable no-console */
import findTz from './find.js'
import inSummerTime from './summerTime.js'

const parseDst = dst => {
  if (!dst) {
    return []
  }
  return dst.split('->')
}

//iana codes are case-sensitive, technically
const titleCase = str => {
  str = str[0].toUpperCase() + str.substr(1)
  str = str.replace(/[/_-]([a-z])/gi, s => {
    return s.toUpperCase()
  })
  str = str.replace(/_(of|es)_/i, (s) => s.toLowerCase())
  str = str.replace(/\/gmt/i, '/GMT')
  str = str.replace(/\/Dumontdurville$/i, '/DumontDUrville')
  str = str.replace(/\/Mcmurdo$/i, '/McMurdo')
  str = str.replace(/\/Port-au-prince$/i, '/Port-au-Prince')
  return str
}

//get metadata about this timezone
const timezone = s => {
  let zones = s.timezones
  let tz = s.tz
  if (zones.hasOwnProperty(tz) === false) {
    tz = findTz(s.tz, zones)
  }
  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'")
    }
    return {
      current: {
        epochShift: 0
      }
    }
  }
  let found = zones[tz]
  let result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  }

  if (result.hasDst) {
    let arr = parseDst(found.dst)
    result.change = {
      start: arr[0],
      back: arr[1]
    }
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = found.offset // (july)
  let winter = summer // (january) assume it's the same for now
  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1
    } else {
      //southern hemisphere
      winter = found.offset + 1
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
