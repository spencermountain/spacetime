'use strict';
const ms = require('../../lib/milliseconds');

//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: (n) => n > 0 && n < 4000,
    walkTo: (s, n) => {
      while (s.year() < n) {
        s.epoch += ms.month;
      }
      while (s.year() > n) {
        s.epoch -= ms.month;
      }
    }
  },
  month: {
    valid: (n) => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      while (s.month() < n) {
        s.epoch += ms.day;
      }
      while (s.month() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  date: {
    valid: (n) => n > 0 && n <= 31,
    walkTo: (s, n) => {
      while (s.date() < n) {
        s.epoch += ms.hour;
      }
      while (s.date() > n) {
        s.epoch -= ms.hour;
      }
    }
  },
  hour: {
    valid: (n) => n > 0 && n <= 24,
    walkTo: (s, n) => {
      while (s.hour() < n) {
        s.epoch += ms.minute;
      }
      while (s.hour() > n) {
        s.epoch -= ms.minute;
      }
    }
  },
  minute: {
    valid: (n) => n > 0 && n < 60,
    walkTo: (s, n) => {
      while (s.minute() < n) {
        s.epoch += ms.second;
      }
      while (s.minute() > n) {
        s.epoch -= ms.second;
      }
    }
  }
};

const walkTo = (s, obj) => {
  let wants = {
    year: obj.year || s.year(),
    month: obj.month || s.month(),
    date: obj.date || s.date(),
    hour: obj.hour || s.hour(),
    minute: obj.minute || s.minute(),
  };
  let keys = Object.keys(units);
  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (!units[k].valid(n)) {
      return;
    }
    units[k].walkTo(s, n);
  }
  return;
};
module.exports = walkTo;
