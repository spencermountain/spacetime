import zones from '../../data'
import summerTime from './summerTime'

const parseDst = dst => {
  if (!dst) {
    return [];
  }
  return dst.split('->')
};

//get metadata about this timezone
export default function timezone(s) {
  let tz = s.tz;
  if (!zones[tz]) {
    console.warn("Warn: could not find given or local timezone - '" + tz + "'");
    return {
      current: {
        epochShift: 0,
      },
    };
  }
  //do north-hemisphere version as default (sorry!)
  let m = {
    name: tz,
    hasDst: Boolean(zones[tz].dst),
    hemisphere: zones[tz].h === 's' ? 'South' : 'North', //assume north, unless told
    change: {},
    current: {}
  };
  if (m.hasDst === true) {
    let arr = parseDst(zones[tz].dst)
    m.change = {
      start: arr[0],
      back: arr[1],
    }
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = zones[tz].o // (july)
  let winter = summer // (january) assume it's the same for now
  if (m.hasDst === true) {
    if (m.hemisphere === 'North') {
      winter = summer - 1
    } else { //southern hemisphere
      winter = zones[tz].o + 1
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (m.hasDst === false) {
    m.current.offset = summer
    m.current.isDST = false
  } else if (summerTime(s, m) === true) {
    m.current.offset = summer
    m.current.isDST = m.hemisphere === 'North' //dst 'on' in winter in north
  } else { //use 'winter' january-time
    m.current.offset = winter
    m.current.isDST = m.hemisphere === 'South' //dst 'on' in summer in south
  }
  // let minutes = m.current.offset * 60
  // m.current.epochShift = minutes * 60 * 1000

  return m;
};
