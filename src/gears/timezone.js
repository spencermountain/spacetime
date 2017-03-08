'use strict';
const zones = require('../../data/zonefile.2017');
const isDst = require('./isDst');

const parseDst = (dst) => {
  let arr = dst.split(' -> ').map((s) => {
    let tmp = s.split('/');
    return {
      month: parseInt(tmp[0], 10),
      date: parseInt(tmp[1], 10),
      hour: parseInt(tmp[2], 10),
    };
  });
  return {
    start: arr[0],
    end: arr[1],
  };
};

//get metadata about this timezone
const timezone = (s) => {
  let tz = s.tz;
  if (!zones[tz]) {
    return {};
  }
  let meta = {
    dst: parseDst(zones[tz].dst),
    name: tz
  };
  meta.dst.offset = -60;
  //the only exception to 1-hour
  if (meta.name === 'Australia/Lord_Howe') {
    meta.dst.offset = -30;
  }

  meta.offsets = {
    base: zones[tz].min,
    dst: zones[tz].min + meta.dst.offset
  };
  meta.dst = isDst(s, tz);

  return meta;
};
module.exports = timezone;

// console.log(timezone_meta('America/Thunder_Bay'));
