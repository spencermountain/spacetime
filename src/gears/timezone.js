'use strict';
const zones = require('../../data/zonefile.2017');

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

//
const timezone_meta = (tz) => {
  if (!zones[tz]) {
    return {};
  }
  let meta = {
    dst: parseDst(zones[tz].dst),
    offset: zones[tz].offset,
    tz: tz
  };
  meta.dst.offset = -60;
  //the only exception to 1-hour
  if (tz === 'Australia/Lord_Howe') {
    meta.dst.offset = -30;
  }
  return meta;
};
module.exports = timezone_meta;

console.log(timezone_meta('America/Thunder_Bay'));
