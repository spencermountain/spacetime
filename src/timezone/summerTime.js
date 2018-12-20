'use strict'
const zeroPad = require('../fns').zeroPad;

const toString = function(d) {
  return zeroPad((d.getMonth() + 1)) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours())
};

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange = (s, m, defaultOffset) => {
  if (m.hasDst !== true || !m.change.start || !m.change.back) {
    return false
  }
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  let d = new Date(s.epoch);
  //(try to mediate this a little?)
  let bias = d.getTimezoneOffset() || 0
  let shift = bias + (defaultOffset * 60) //in minutes
  shift = shift * 60 * 1000 //in ms
  d = new Date(s.epoch + shift);

  let current = toString(d);
  //eg. is it after ~november?
  if (current >= m.change.start) {
    //eg. is it before ~march~ too?
    if (current < m.change.back) {
      return true
    }
  }
  return false
}
module.exports = shouldChange
