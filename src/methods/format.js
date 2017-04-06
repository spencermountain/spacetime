'use strict';
const fmt = require('../fns');
const months = require('../data/months');
const days = require('../data/days');

//
const format = (s) => {
  //pre-compute the re-used values
  let year = s.year();
  let date = s.date();
  let month = s.month();
  let day = s.day();
  let minute = fmt.zeroPad(s.minute());
  let hour24 = s.hour();
  let hour12 = hour24;
  if (hour24 > 12) {
    hour12 = hour24 - 12;
  }
  if (hour12 === 0) {
    hour12 = 12;
  }
  let ord = fmt.ordinal(date);
  let numDate = fmt.zeroPad(date);
  let numMonth = fmt.zeroPad(date);

  //start building format object
  let all = {
    day: {
      short: fmt.titleCase(days.short[day]), //wed
      long: fmt.titleCase(days.long[day]), //wednesday
    },
    month: {
      short: fmt.titleCase(months.short[month]), //Sept
      long: fmt.titleCase(months.long[month]), //September
    },
    time: {
      h12: `${hour12}:${minute}${s.ampm()}`, //3:45pm
      h24: `${hour24}:${minute}` //15:45
    },
    year: {
      long: '' + year,
      short: '\'' + ('' + year).substr(2, 4)
    },
  };

  all.numeric = {
    uk: `${numDate}/${numMonth}/${year}`, //dd/mm/yyyy
    us: `${numMonth}/${numDate}/${year}`, //mm/dd/yyyy
  };

  all.date = {
    ordinal: ord, //12th
    cardinal: '' + date, //12
    short: `${all.month.short} ${ord}`, //Apr 12
    long: `${all.month.long} ${ord}`, //April 12
  };

  all.iso = {
    short: `${year}-${numMonth}-${numDate}`, //2017-02-15
    local: `${year}-${fmt.zeroPad(month + 1)}-${numDate}T${hour24}:${minute}:${fmt.zeroPad(s.second())}:${fmt.zeroPad(s.millisecond(), 3)}Z`, //2017-03-08T19:45:28.367Z
    utc: (new Date(s.epoch)).toISOString(), //2017-03-08T19:45:28.367Z
  };

  all.nice = {
    short: `${all.month.short} ${ord}, ${all.time.h12}`,
    long: `${all.day.long} ${all.month.long} ${ord}, ${all.time.h12}`
  };

  all.full = {
    short: `${all.day.short} ${all.month.short} ${ord} ${year}, ${all.time.h12}`,
    long: `${all.day.long} ${all.month.long} ${ord} ${year}, ${all.time.h12}`,
  };
  return all;
};
module.exports = format;
