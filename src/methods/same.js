'use strict';

const print = {
  hour: (s) => {
    return [s.year(), s.month(), s.date(), s.hour()].join('-');
  },
  day: (s) => {
    return [s.year(), s.month(), s.date()].join('-');
  },
  week: (s) => {
    return [s.year(), s.week()].join('-');
  },
  month: (s) => {
    return [s.year(), s.month()].join('-');
  },
  quarter: (s) => {
    return [s.year(), s.quarter()].join('-');
  },
  year: (s) => {
    return s.year();
  }
};

const addMethods = (Space) => {

  const methods = {
    isSame: function(b, unit) {
      let a = this;
      if (typeof b === 'string' || typeof b === 'number') {
        b = new Space(b);
      }
      if (unit === 'hour' || unit === 'hours') {
        return print.hour(a) === print.hour(b);
      }
      if (unit === 'day' || unit === 'days' || unit === 'date') {
        return print.day(a) === print.day(b);
      }
      if (unit === 'week' || unit === 'weeks') {
        return print.week(a) === print.week(b);
      }
      if (unit === 'month' || unit === 'months') {
        return print.month(a) === print.month(b);
      }
      if (unit === 'quarter' || unit === 'quarters') {
        return print.quarter(a) === print.quarter(b);
      }
      if (unit === 'year' || unit === 'years') {
        return print.year(a) === print.year(b);
      }
      return null;
    },
  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
