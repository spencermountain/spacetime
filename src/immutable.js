'use strict';
const Spacetime = require('./spacetime');
const whereIts = require('./findTz').whereIts;
const pkg = require('../package.json');

function clobber(instance) {
  // these methods return instances with mutated values now
  let clobbers = [
    'add',
    'subtract',
    'hour',
    'date',
    'day',
    'time',
    'month',
    'quarter',
    'goto',
    'week',
    'season',
    'dayTime',
    'dayOfYear',
    'ampm',
    'dayName',
    'monthName',
  ]
  // walk thee clobbers and clobber with immutablilitieeeees
  clobbers.forEach(prop => {
    Object.defineProperty(instance, prop, {
      enumerable: false,
      value(...args) {
        var copy = instance.clone()
        return copy[prop].apply(copy, args)
      }
    })
  })
  return instance
}

// a new factory; this one with terrible powers!
function ImmutableSpacetime(...args) {
  var instance = clobber(new Spacetime(...args))
  instance.clone = x => clobber(new Spacetime(...args))
  return instance
}

ImmutableSpacetime.now = function now(tz) {
  var instance = clobber(new Spacetime(new Date().getTime(), tz))
  instance.clone = x => clobber(new Spacetime(new Date().getTime(), tz))
  return instance
}

ImmutableSpacetime.today = function today(tz) {
  var instance = clobber(new Date().getTime(), tz)
  instance.clone = x => clobber(new Date().getTime(), tz)
  return instance
}

ImmutableSpacetime.tomorrow = function tomorrow(tz) {
  let s0 = new Spacetime(new Date().getTime(), tz);
  var instance = clobber(s0.add(1, 'day').startOf('day'))
  instance.clone = x => {
    let s1 = new Spacetime(new Date().getTime(), tz);
    return clobber(s1.add(1, 'day').startOf('day'))
  }
  return instance
}

ImmutableSpacetime.yesterday = function yesterday(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  let instance = clobber(s.subtract(1, 'day').startOf('day'));
  instance.clone = x => {
    let s1 = new Spacetime(new Date().getTime(), tz);
    return clobber(s1.subtract(1, 'day').startOf('day'));
  }
  return instance;
};

//find tz by time
ImmutableSpacetime.whereIts = whereIts;

//this is handy
ImmutableSpacetime.version = pkg.version;

// coolest sounding exports ever
module.exports = ImmutableSpacetime
