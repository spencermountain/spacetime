'use strict';
const seasons = require('./lib/seasons');

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
  season: (s) => {
    let current = s.season();
    for(let i = 0; i < seasons.length; i++) {
      if (seasons[i][0] === current) {
        s.month(seasons[i][1]);
        s.date(seasons[i][2]);
        s = toHour(s, 0);
        return s;
      }
    }
    return s;
  },
  year: (s) => {
    s = toHour(s, 1);
    s.month(0);
    s.date(1);
    return s;
  },
};

const startOf = (s, unit) => {
  if (units[unit]) {
    return units[unit](s);
  }
  return s;
};

//piggy-backs off startOf
const endOf = (s, unit) => {
  if (units[unit]) {
    s = units[unit](s);
    s.add(1, unit);
    s.subtract(2, 'milliseconds');
    return s;
  }
  return s;
};
module.exports = {
  startOf: startOf,
  endOf: endOf
};
