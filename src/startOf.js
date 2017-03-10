'use strict';
//
const toHour = function(s, h) {
  s.hour(h);
  s.minute(0);
  s.second(0);
  s.millisecond(1);
  return s;
};

const units = {
  hour: (s) => {
    s.minute(0);
    s.second(0);
    s.millisecond(0);
    return s;
  },
  day: (s) => {
    s = toHour(s, 0);
    return s;
  },
  week: (s) => {
    let original = s.epoch;
    s = toHour(s, 0);
    s.day(0);
    if (s.isAfter(original)) {
      s.subtract(1, 'week');
    }
    return s;
  },
  month: (s) => {
    s = toHour(s, 1);
    s.date(1);
    return s;
  },
  quarter: (s) => {
    let q = s.quarter();
    s.quarter(q);
    return s;
  },
};

const startOf = (s, unit) => {
  if (units[unit]) {
    return units[unit](s);
  }
  return s;
};
module.exports = startOf;
