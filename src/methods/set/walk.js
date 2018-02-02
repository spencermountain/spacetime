'use strict';
const ms = require('../../data/milliseconds');

//basically, step-forward/backward until js Date object says we're there.
const walk = function(s, n, fn, unit) {
  let current = s.d[fn]()
  if (current === n) {
    return
  }
  //try to get it as close as we can
  let diff = (n - current)
  s.epoch += ms[unit] * diff

  while (s.d[fn]() < n) {
    s.epoch += ms[unit];
  }
  while (s.d[fn]() > n) {
    s.epoch -= ms[unit];
  }
}
//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: n => n > -4000 && n < 4000,
    walkTo: (s, n) => walk(s, n, 'getFullYear', 'year')
  },
  month: {
    valid: n => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let current = s.d.getMonth()
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      let diff = (n - current)
      s.epoch += ms.day * (diff * 28)
      //incriment by day
      while (s.d.getMonth() < n) {
        s.epoch += ms.day;
      }
      while (s.d.getMonth() > n) {
        s.epoch -= ms.day;
      }
    },
  },
  date: {
    valid: n => n > 0 && n <= 31,
    walkTo: (s, n) => walk(s, n, 'getDate', 'day')
  },
  hour: {
    valid: n => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, 'getHours', 'hour')
  },
  minute: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute')
  },
  second: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getSeconds', 'second')
  },
  millisecond: {
    valid: n => n >= 0 && n < 1000,
    walkTo: (s, n) => {
      //do this one directly
      s.milliseconds(n);
    },
  },
};

const walkTo = (s, wants) => {
  let keys = Object.keys(units);
  let old = s.clone();
  for (let i = 0; i < keys.length; i++) {
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
      s.valid = false;
      s.epoch = null;
      console.warn('invalid ' + k + ': ' + n);
      return;
    }
    units[k].walkTo(s, n);
  }
  //if we've gone over a dst-change or something..
  if (wants.hour === undefined && s.hour() !== old.hour()) {
    s.hour(old.hour());
  }
  return;
};
module.exports = walkTo;
