'use strict';
// const zones = require('../../data');
const findTz = require('./find')
const summerTime = require('./summerTime')
const display = require('./display')

const parseDst = dst => {
  if (!dst) {
    return [];
  }
  return dst.split('->')
};

const titleCase = function(str) {
  str = str[0].toUpperCase() + str.substr(1)
  str = str.replace(/\/gmt/, '/GMT')
  str = str.replace(/[\/_]([a-z])/ig, (s) => {
    return s.toUpperCase()
  })
  return str
}

//get metadata about this timezone
const timezone = s => {
  let zones = s.timezones
  let tz = findTz(s.tz, zones)
  if (tz === null) {
    console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    return {
      current: {
        epochShift: 0,
      },
    };
  }
  let found = zones[tz]
  let result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  }

  if (result.hasDst) {
    let arr = parseDst(found.dst)
    result.change = {
      start: arr[0],
      back: arr[1],
    }
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = found.offset // (july)
  let winter = summer // (january) assume it's the same for now
  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1
    } else { //southern hemisphere
      winter = found.offset + 1
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (result.hasDst === false) {
    result.current.offset = summer
    result.current.isDST = false
  } else if (summerTime(s, result, summer) === true) {
    result.current.offset = summer
    result.current.isDST = result.hemisphere === 'North' //dst 'on' in winter in north
  } else { //use 'winter' january-time
    result.current.offset = winter
    result.current.isDST = result.hemisphere === 'South' //dst 'on' in summer in south
  }
  //try to find the best name for it..
  result.display = display(tz, result, zones)
  return result
};
module.exports = timezone;
