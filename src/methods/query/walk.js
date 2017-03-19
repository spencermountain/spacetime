'use strict';
const ms = require('../../lib/milliseconds');
//find the desired date by a incriment/check while loop

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
  },
  date: {
    valid: (n) => n > 0 && n <= 31,
  },
  hour: {
    valid: (n) => n > 0 && n <= 24,
  }
};

const walkTo = (s, obj) => {
  let wants = {
    year: obj.year || s.year(),
    month: obj.month || s.month(),
    date: obj.date || s.date(),
    hour: obj.hour || s.hour(),
  };
  let keys = Object.keys(units);
  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];
    console.log('doing ' + k + ':');
    let n = wants[k];
    if (!units[k].valid(n)) {
      return;
    }
    units[k].walkTo(s, n);
  }
  return;
};
module.exports = walkTo;
