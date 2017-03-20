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
        s.epoch += ms.day;
      }
      while (s.date() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  hour: {
    valid: (n) => n > 0 && n < 24,
    walkTo: (s, n) => {
      while (s.hour() < n) {
        s.epoch += ms.hour;
      }
      while (s.hour() > n) {
        s.epoch -= ms.hour;
      }
    }
  },
  minute: {
    valid: (n) => n > 0 && n < 60,
    walkTo: (s, n) => {
      while (s.minute() < n) {
        s.epoch += ms.minute;
      }
      while (s.minute() > n) {
        s.epoch -= ms.minute;
      }
    }
  }
};

const walkTo = (s, wants) => {
  let keys = Object.keys(units);
  let old = s.clone();
  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (n === undefined) {
      continue;
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      console.log('invalid ' + k + ': ' + n);
      return;
    }
    // console.log('walking ' + k + ' to ' + n);
    units[k].walkTo(s, n);
  }
  //if we've gone over a dst-change or something..
  if (wants.hour === undefined && s.hour() !== old.hour()) {
    s.hour(old.hour());
  }
  return;
};
module.exports = walkTo;
