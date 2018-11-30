'use strict';
// const zones = require('../../data');
const find = require('./find')
const summerTime = require('./summerTime')

const parseDst = dst => {
  if (!dst) {
    return [];
  }
  return dst.split('->')
};

//get metadata about this timezone
const timezone = s => {
  let zones = s.timezones
  let tz = find(s.tz, zones)
  if (tz === null) {
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
    current: {},
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
  let summer = zones[tz].offset // (july)
  let winter = summer // (january) assume it's the same for now
  if (m.hasDst === true) {
    if (m.hemisphere === 'North') {
      winter = summer - 1
    } else { //southern hemisphere
      winter = zones[tz].offset + 1
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (m.hasDst === false) {
    m.current.offset = summer
    m.current.isDST = false
  } else if (summerTime(s, m, summer) === true) {
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
module.exports = timezone;
