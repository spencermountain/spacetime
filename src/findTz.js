'use strict'
const Spacetime = require('./spacetime');
// const timezones = require('../data');

exports.whereIts = function(a, b) {
  let start = new Spacetime(null);
  let end = new Spacetime(null);
  start.time(a);
  //if b is undefined, use as 'within one hour'
  if (b) {
    end.time(b);
  } else {
    end = start.clone().add(59, 'minutes');
  }

  let startHour = start.hour();
  let endHour = end.hour();
  let tzs = Object.keys(start.timezones).filter(tz => {
    let m = new Spacetime(null, tz);
    let hour = m.hour();
    //do 'calendar-compare' not real-time-compare
    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false;
      }
      if (hour === endHour && m.minute() > end.minute()) {
        return false;
      }
      return true;
    }
    return false;
  });
  return tzs;
};
