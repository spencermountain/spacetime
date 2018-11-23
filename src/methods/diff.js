'use strict';
const fns = require('../fns');

//init this function up here
let doAll = () => {
}
//increment until dates are the same
const climb = function(a, b, unit) {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a.add(1, unit);
    i += 1;
  }
  //oops, we went too-far..
  if (!a.isSame(b, unit)) {
    i -= 1;
  }
  return i;
};

const diffQuick = function(a, b) {
  let ms = b.epoch - a.epoch
  let obj = {
    milliseconds: ms,
    seconds: parseInt(ms / 1000, 10),
  }
  obj.minutes = parseInt(obj.seconds / 60, 10)
  obj.hours = parseInt(obj.minutes / 60, 10)
  return obj
}

const diff = function(a, b, unit) {
  //remove trailing s
  b = fns.beADate(b, a)
  if (!unit) {
    return doAll(a, b)
  }
  //make sure it's plural-form
  unit = fns.normalize(unit);
  if (/s$/.test(unit) !== true) {
    unit += 's'
  }
  //do quick-form for these small-ones
  if (unit === 'milliseconds' || unit === 'seconds' || unit === 'minutes') {
    return diffQuick(a, b)[unit]
  }
  //otherwise, do full-version
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
}

doAll = function(a, b) {
  //do ms, seconds, minutes in a faster way
  let all = diffQuick(a, b)
  all.years = diff(a, b, 'year')
  all.months = diff(a, b, 'month')
  all.weeks = diff(a, b, 'week')
  all.days = diff(a, b, 'day')
  //only slow-compute hours if it's a small diff
  if (all.years === 0) {
    all.hours = diff(a, b, 'hour')
  }
  return all
}
module.exports = diff;
