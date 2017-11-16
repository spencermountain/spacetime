'use strict';
const zones = require('../../data');
// const isDst = require('./isDst');
const shouldChange = require('./shouldChange')


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
  let meta = {
    name: tz,
    hasDst: Boolean(zones[tz].dst),
    hemisphere: zones[tz].h === 's' ? 'South' : 'North', //assume north, unless told
    offset: zones[tz].o / 60,
    change: {},
    current: {}
  };
  let dates = parseDst(zones[tz].dst);
  if (zones[tz].dst) {
    //in winter, northern hemisphere is in DST
    if (zones[tz].h === 'n') {
      meta.offset -= 1
      meta.change = {
        start: dates[0],
        back: dates[1],
        offset: meta.offset + 1
      }
    } else {
      meta.hemisphere = 'South'
      meta.change = {
        start: dates[1],
        back: dates[0],
        offset: meta.offset - 1
      }
    }
  }

  //figure-out the current offset
  if (shouldChange(s, meta) === true) {
    meta.current = {
      isDst: meta.hemisphere === 'North',
      offset: meta.change.offset,
    }
  } else {
    meta.current = {
      isDst: meta.hemisphere === 'South',
      offset: meta.offset
    }
  }
  meta.current.epochShift = meta.current.offset * 60 * 60 * 1000

  return meta;
};
module.exports = timezone;
