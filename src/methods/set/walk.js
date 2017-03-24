'use strict';
const ms = require('../../data/milliseconds');

//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: (n) => n > 0 && n < 4000,
    walkTo: (s, n) => {
      while (s.year() < n) {
        s.epoch += ms.year;
      }
      while (s.year() > n) {
        s.epoch -= ms.year;
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
    valid: (n) => n >= 0 && n < 24,
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
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => {
      while (s.minute() < n) {
        s.epoch += ms.minute;
      }
      while (s.minute() > n) {
        s.epoch -= ms.minute;
      }
    }
  },
  second: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => {
      while (s.second() < n) {
        s.epoch += ms.second;
      }
      while (s.second() > n) {
        s.epoch -= ms.second;
      }
    }
  },
  millisecond: {
    valid: (n) => n >= 0 && n < 1000,
    walkTo: (s, n) => {
      //do this one directly
      s.milliseconds(n);
    }
  }
};

// const preProcess = function(want) {
//   const sizes = {
//     millisecond: 1000,
//     second: 60,
//     minute: 60,
//   };
//   const units = Object.keys(sizes);
//   for(let i = 0; i < units.length - 1; i++) {
//     let unit = units[i];
//     let nextUnit = units[i + 1];
//     if (want[unit] >= sizes[unit]) {
//       want.second += parseInt(want.millisecond / 1000, 10);
//       want.millisecond = want.millisecond % 1000;
//     }
//   }
//   return want;
// };

// const postProcess = function(s, wants) {
//   Object.keys(wants).forEach((k) => {
//     if (s[k]() !== wants[k]) {
//       console.warn('invalid ' + k + ':   - want ' + wants[k]);
//     }
//   });
//   return s;
// };

const walkTo = (s, wants) => {
  // wants = preProcess(wants);
  let keys = Object.keys(units);
  let old = s.clone();
  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (n === undefined) {
      n = old[k]();
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
  // s = postProcess(s, wants);
  return;
};
module.exports = walkTo;
