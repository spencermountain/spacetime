'use strict';
// const ms = require('../lib/milliseconds');

//how far it is, from 0-1
const year = (s) => {
  return s.dayOfYear() / 365;
};
const day = (s) => {
  return s.hour() / 24;
};
const hour = (s) => {
  return s.minute() / 60;
};
const progress = function(s) {
  const k = 3;
  s = s.clone();

  return {
    year: year(s).toFixed(k),
    day: day(s).toFixed(k),
    hour: hour(s).toFixed(k),
  };
};
module.exports = progress;
