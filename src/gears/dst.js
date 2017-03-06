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

const isAfter = function(a, b) {
  //is it after the starting?
  if (a.month > b.month) {
    return true;
  }
  if (a.month === b.month && a.date > b.date) {
    return true;
  }
  if (a.month === b.month && a.date === b.date && a.hour >= b.hour) {
    return true;
  }
  return false;
};

//return a difference from the iata offset
const DST = (s) => {
  if (!zones[s.tz] || !zones[s.tz].dst) {
    return 0;
  }
  let dst = zones[s.tz].dst || '';
  // console.log(dst);
  if (!dst) {
    return false;
  }
  dst = parseDst(dst);

  let current = {
    month: s.month(),
    date: s.date(),
    hour: s.hour(),
  };
  if (isAfter(current, dst.start)) {
    // console.log('after start');
    if (!isAfter(current, dst.end)) {
      // console.log('after end');
      return true;
    }
  }
  return false;
};
module.exports = DST;
