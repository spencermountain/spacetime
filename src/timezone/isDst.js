'use strict';

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

//is this time between dst.start and dst.end?
const isDst = (s, dst) => {
  if (!dst.start || !dst.end) {
    return false;
  }
  let d = new Date(s.epoch);
  let current = {
    month: d.getMonth(),
    date: d.getDate(),
    hour: d.getHours(),
  // month: s.month(),
  // date: s.date(),
  // hour: s.hour(),
  };
  if (isAfter(current, dst.start)) {
    if (!isAfter(current, dst.end)) {
      return true;
    }
  }
  return false;
};
module.exports = isDst;
