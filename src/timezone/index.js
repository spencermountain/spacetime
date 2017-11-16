'use strict';
const zones = require('../../data');
const summerTime = require('./summerTime')

const parseDst = dst => {
  if (!dst) {
    return {};
  }
  let arr = dst.split(' -> ').map(s => {
    let tmp = s.split('/').map(n => parseInt(n, 10));
    return {
      month: tmp[0],
      date: tmp[1],
      hour: tmp[2],
    };
  });
  return arr
};

//get metadata about this timezone
const timezone = s => {
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
  let arr = parseDst(zones[tz].dst)
  let m = {
    name: tz,
    hasDst: Boolean(zones[tz].dst),
    hemisphere: zones[tz].h === 's' ? 'South' : 'North', //assume north, unless told
    change: {
      start: arr[0],
      back: arr[1],
    },
    current: {}
  };
  if (m.hemisphere === 'South') {
    m.change = {
      start: arr[1],
      back: arr[0],
    }
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = zones[tz].o / 60 // (july)
  let winter = summer // (january) assume it's the same for now
  if (m.hasDst === true) {
    if (m.hemisphere === 'North') {
      summer = zones[tz].o / 60
      winter = summer - 1
    } else { //southern hemisphere
      winter = zones[tz].o / 60
      summer = winter - 1
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
  m.current.epochShift = m.current.offset * 60 * 60 * 1000

  return m;
};
module.exports = timezone;
