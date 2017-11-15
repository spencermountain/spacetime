'use strict';
const zones = require('../../data');
const isDst = require('./isDst');

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
    change: {},
    offset: zones[tz].o / 60
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

  //include hemisphere (for seasons, DST)
  // meta.hemisphere = null;
  // if (zones[tz].h === 'n') {
  //   meta.hemisphere = 'North';
  // } else if (zones[tz].h === 's') {
  //   meta.hemisphere = 'South';
  // }
  // // console.log(meta.dst)
  //
  // //calculate dst change direction + amount
  // meta.dst.change = 0;
  // if (meta.dst.start && meta.dst.end) {
  //   meta.dst.change = -60; //'spring ahead'
  //   // if (meta.hemisphere === 'South') {
  //   // meta.dst.change = 60 // 🙃
  //   // }
  //   //the only exception to this rule is 'lord howe'
  //   if (meta.name === 'Australia/Lord_Howe') {
  //     meta.dst.change = -30;
  //   }
  // }
  //
  //
  // //both offsets (in mins)
  // meta.offsets = {
  //   base: zones[tz].o + meta.dst.change,
  //   dst: zones[tz].o,
  // };
  //
  // if (isDst(s, meta.dst)) {
  //   meta.current = {
  //     isDst: true,
  //     offset: meta.offsets.dst,
  //   };
  // } else {
  //   meta.current = {
  //     isDst: false,
  //     offset: meta.offsets.base,
  //   };
  // }
  // meta.current.epochShift = meta.current.offset * 60 * 1000;
  return meta;
};
module.exports = timezone;
