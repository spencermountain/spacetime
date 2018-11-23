'use strict'
const fns = require('../fns');
//by spencermountain + Shaun Grady

//our conceptual 'break-points' for each unit
const qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
}

//get number of hours/minutes... between the two dates
function getDiff(a, b) {
  const isBefore = a.isBefore(b);
  const later = isBefore ? b : a;
  let earlier = isBefore ? a : b;
  earlier = earlier.clone()
  const diff = {
    years: 0,

    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  Object.keys(diff).forEach((unit) => {
    if (earlier.isSame(later, unit)) {
      return
    }
    let max = earlier.diff(later, unit)
    earlier.add(max, unit)
    //did we go one too far?
    if (earlier.epoch > later.epoch + 10) { //(fudge this calc by 10 milliseconds)
      earlier.subtract(1, unit)
      max -= 1
    }
    diff[unit] = max
  })
  //reverse it
  if (isBefore) {
    Object.keys(diff).forEach(u => {
      if (diff[u] !== 0) {
        diff[u] *= -1
      }
    });
  }
  return diff;
}

// Expects a plural unit arg
function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }
  return value + ' ' + unit;
}

//create the human-readable diff between the two dates
const since = function(start, end) {
  end = fns.beADate(end, start)
  const diff = getDiff(start, end);
  const isNow = Object.keys(diff).every(u => !diff[u]);
  if (isNow === true) {
    return {
      diff: diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    };
  }
  let rounded;
  let qualified;
  let precise;
  let englishValues = [];

  //go through each value and create its text-representation
  Object.keys(diff).forEach((unit, i, units) => {
    const value = Math.abs(diff[unit]);
    if (value === 0) {
      return;
    }
    const englishValue = pluralize(value, unit);
    englishValues.push(englishValue);
    if (!rounded) {
      rounded = qualified = englishValue;
      if (i > 4) {
        return;
      }
      //is it a 'almost' something, etc?
      const nextUnit = units[i + 1];
      const nextValue = Math.abs(diff[nextUnit]);
      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers[nextUnit].over)
        qualified = 'over ' + englishValue;
    }
  });
  //make them into a string
  precise = englishValues.splice(0, 2).join(', ');
  //handle before/after logic
  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }
  return {
    diff: diff,
    rounded: rounded,
    qualified: qualified,
    precise: precise
  };
}

module.exports = since;
