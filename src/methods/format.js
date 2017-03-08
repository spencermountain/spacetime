'use strict';
const fmt = require('./lib/fmt');
const months = require('./lib/months');

//
const format = (s) => {
  let year = s.year();
  let date = s.date();
  let month = s.month();
  let day = s.dayName();
  let minute = s.minute();
  let hour24 = s.hour();
  let hour12 = hour24;
  if (hour24 > 12) {
    hour12 = hour24 - 12;
  }
  return {
    numeric: {
      uk: `${fmt.zeroPad(date)}/${fmt.zeroPad(month)}/${year}`, //dd/mm/yyyy
      us: `${fmt.zeroPad(month)}/${fmt.zeroPad(date)}/${year}`, //mm/dd/yyyy
    },
    time: {
      h12: `${hour12}:${minute}${s.ampm()}`, //3:45pm
      h24: `${hour24}:${minute}` //15:45
    },
    date: {
      short: '', //Apr 12 2016
      long: '', //April 12 2016
    },
    iso: {

    },
    day: {
      short: '', //wed
      long: fmt.titleCase(day), //wednesday
    }
  };
};
module.exports = format;
