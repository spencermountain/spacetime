'use strict';

exports.isDate = function(d) {
  return (
    Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf())
  );
};
exports.isArray = function(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};
exports.isObject = function(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};

exports.zeroPad = function(str, len) {
  len = len || 2;
  let pad = '0';
  str = str + '';
  return str.length >= len
    ? str
    : new Array(len - str.length + 1).join(pad) + str;
};

exports.titleCase = function(str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

exports.ordinal = function(i) {
  let j = i % 10;
  let k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

exports.normalize = str => {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
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
