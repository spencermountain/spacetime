'use strict';
const fmt = require('../fns');
const months = require('../data/months');
const days = require('../data/days');

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
  if (hour12 === 0) {
    hour12 = 12;
  }
  let all = {
    numeric: {
      uk: `${fmt.zeroPad(date)}/${fmt.zeroPad(month)}/${year}`, //dd/mm/yyyy
      us: `${fmt.zeroPad(month)}/${fmt.zeroPad(date)}/${year}`, //mm/dd/yyyy
    },
    time: {
      h12: `${hour12}:${fmt.zeroPad(minute)}${s.ampm()}`, //3:45pm
      h24: `${hour24}:${fmt.zeroPad(minute)}` //15:45
    },
    date: {
      ordinal: fmt.ordinal(date), //12th
      cardinal: '' + date, //12
      short: `${fmt.titleCase(months.short[month])} ${fmt.ordinal(date)}`, //Apr 12
      long: `${fmt.titleCase(months.long[month])} ${fmt.ordinal(date)}`, //April 12
    },
    year: {
      long: '' + year,
      short: '\'' + ('' + year).substr(2, 4)
    },
    iso: {
      short: `${year}-${fmt.zeroPad(month)}-${fmt.zeroPad(date)}`, //2017-02-15
      local: `${year}-${fmt.zeroPad(month + 1)}-${fmt.zeroPad(date)}T${hour24}:${fmt.zeroPad(minute)}:${fmt.zeroPad(s.second())}:${fmt.zeroPad(s.millisecond(), 3)}Z`, //2017-03-08T19:45:28.367Z
      utc: (new Date(s.epoch)).toISOString(), //2017-03-08T19:45:28.367Z
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
  all.nice = {
    short: `${fmt.titleCase(months.short[month])} ${fmt.ordinal(date)}, ${all.time.h12}`,
    long: `${all.day.long} ${fmt.titleCase(months.long[month])} ${fmt.ordinal(date)}, ${all.time.h12}`
  };
  all.full = {
    short: `${fmt.titleCase(days.short[day])} ${fmt.titleCase(months.short[month])} ${fmt.ordinal(date)} ${year}, ${all.time.h12}`,
    long: `${fmt.titleCase(days.long[day])} ${fmt.titleCase(months.long[month])} ${fmt.ordinal(date)} ${year}, ${all.time.h12}`,
  };
  return all;
};
module.exports = format;
