'use strict';
const fns = require('../fns');
let doAll = () => {
}
//increment until dates are the same
const climb = function(a, b, unit) {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    a.add(1, unit);
    i += 1;
  }
  if (!a.isSame(b, unit)) {
    i -= 1;
  }
  return i;
};

const diff = function(a, b, unit) {
  b = fns.beADate(b, a)
  if (!unit) {
    return doAll(a, b)
  }
  unit = fns.normalize(unit);
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
}

doAll = function(a, b) {
  return {
    years: diff(a, b, 'year'),
    months: diff(a, b, 'month'),
    weeks: diff(a, b, 'week'),
    days: diff(a, b, 'day'),
    hours: diff(a, b, 'hour'),
    minutes: diff(a, b, 'minute'),
  }
}
module.exports = diff;
