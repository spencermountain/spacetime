'use strict';

function zeroPad(str, len) {
  len = len || 2;
  let pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
}

const toString = function(o) {
  return [zeroPad(o.month), zeroPad(o.date), zeroPad(o.hour)].join('-');
};

//is this time between dst.start and dst.end?
const isDst = (s, dst) => {
  if (!dst.start || !dst.end) {
    return false;
  }
  let d = new Date(s.epoch); //this has a order-of-operations issue
  let current = {
    month: d.getMonth(),
    date: d.getDate(),
    hour: d.getHours(),
  };
  current = toString(current);
  let start = toString(dst.start);
  let end = toString(dst.end);
  //in dst, in summer (easy)
  if (start < end) {
    if (current > start && current < end) {
      return true;
    }
    return false;
  } else {
    //in dst, over new-years (trickier)
    if (current > start) {
      return true;
    }
    if (current < end) {
      return true;
    }
  }
  return false;
};
module.exports = isDst;
