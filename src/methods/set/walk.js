'use strict';
const ms = require('../../data/milliseconds');

//basically, step-forward/backward until js Date object says we're there.
const walk = function(s, n, fn, unit, previous) {
  let current = s.d[fn]()
  if (current === n) {
    return //already there
  }
  let startUnit = previous === null ? null : s.d[previous]()
  let original = s.epoch
  //try to get it as close as we can
  let diff = (n - current)
  s.epoch += ms[unit] * diff
  //repair it if we've gone too far or something
  //(go by half-steps, just in case)
  const halfStep = ms[unit] / 2
  while (s.d[fn]() < n) {
    s.epoch += halfStep
  }
  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  }
  //oops, did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original
  }
}
//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: n => n > -4000 && n < 4000,
    walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
  },
  month: {
    valid: n => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let current = s.d.getMonth()
      let original = s.epoch
      let startUnit = s.d.getYear()
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      let diff = n - current
      s.epoch += ms.day * (diff * 28) //special case
      //oops, did we change the year? revert it.
      if (startUnit !== s.d.getYear()) {
        s.epoch = original
      }
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
    walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
  },
  hour: {
    valid: n => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
  },
  minute: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
  },
  second: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getSeconds', 'second', 'getMinutes')
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
      s.epoch = null;
      console.warn('invalid ' + k + ': ' + n);
      return;
    }
    units[k].walkTo(s, n);
  //if we've gone over a dst-change or something..
  // if (wants.hour === undefined && s.hour() !== old.hour()) {
  //   s.hour(old.hour());
  // }
  }
  return;
};
module.exports = walkTo;

// const spacetime = require('../../spacetime')
// let s = new spacetime(1509778800000, 'Canada/Pacific')
// let want = {
//   millisecond: 0,
//   second: 0,
//   minute: 0,
//   hour: 0,
//   date: 4
// }
// s.log()
// units['date'].walkTo(s, 4);
// walkTo(s, want)
// s.log()
