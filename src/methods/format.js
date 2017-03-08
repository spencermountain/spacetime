'use strict';
const fmt = require('./lib/fmt');
const months = require('./lib/months');
const days = require('./lib/days');

//
const format = (s) => {
  let year = s.year();
  let date = s.date();
  let month = s.month();
  let day = s.day();
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
      '12hour': `${hour12}:${minute}${s.ampm()}`, //3:45pm
      '24hour': `${hour24}:${minute}` //15:45
    },
    date: {
      short: `${fmt.titleCase(months.short[month])} ${fmt.ordinal(date)} ${year}`, //Apr 12 2016
      long: `${fmt.titleCase(months.long[month])} ${fmt.ordinal(date)} ${year}`, //April 12 2016
    },
    iso: {
      local: `${year}-${fmt.zeroPad(month)}-${fmt.zeroPad(date)}T${hour24}:${minute}:${s.second()}:${s.millisecond()}Z`, //2017-03-08T19:45:28.367Z
      utc: (new Date(s.epoch)).toISOString() //2017-03-08T19:45:28.367Z
    },
    day: {
      short: fmt.titleCase(days.short[day]), //wed
      long: fmt.titleCase(days.long[day]), //wednesday
    },
    month: {
      short: fmt.titleCase(months.short[month]), //Sept
      long: fmt.titleCase(months.long[month]), //September
    }
  };
};
module.exports = format;
