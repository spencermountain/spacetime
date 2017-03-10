'use strict';

exports.isDate = function(d) {
  return Object.prototype.toString.call(d) === '[object Date]';
};

exports.getEpoch = function(tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp;
  }
  //suport date objects
  if (exports.isDate(tmp)) {
    return tmp.getTime();
  }
  if (tmp.epoch) {
    return tmp.epoch;
  }
  return null;
};
