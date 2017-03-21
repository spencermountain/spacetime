'use strict';
const seasons = require('../data/seasons');
const walkTo = require('./set/walk');

const units = {
  minute: (s) => {
    walkTo(s, {
      second: 0,
      millisecond: 0,
    });
    return s;
  },
  hour: (s) => {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return s;
  },
  day: (s) => {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return s;
  },
  week: (s) => {
    let original = s.epoch;
    s.day(1); //monday
    if (s.isAfter(original)) {
      s.subtract(1, 'week');
    }
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return s;
  },
  month: (s) => {
    walkTo(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
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
    walkTo(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
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
    s.subtract(1, 'milliseconds');
    return s;
  }
  return s;
};
module.exports = {
  startOf: startOf,
  endOf: endOf
};
