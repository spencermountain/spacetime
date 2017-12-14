/* eslint no-unused-vars: "off" */
const Spacetime = require('.');
const whereIts = require('./src/findTz').whereIts;
const pkg = require('./package.json');

function clobber(instance) {
  // these methods return instances with mutated values now
  let clobbers = [
    'add', 
    'subtract', 
    'hour', 
    'date', 
    'day', 
    'month', 
    'quarter', 
    'goto'
  ]
  // walk thee clobbers and clobber with immutablilitieeeees
  clobbers.forEach(prop=> {
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
  instance.clone = x=> clobber(new Spacetime(...args))
  return instance
}

ImmutableSpacetime.now = function now() {
  var instance = clobber(Spacetime.now())
  instance.clone = x=> clobber(Spacetime.now())
  return instance
}

ImmutableSpacetime.today = function today() {
  var instance = clobber(Spacetime.today())
  instance.clone = x=> clobber(Spacetime.today())
  return instance
}

ImmutableSpacetime.tomorrow = function tomorrow() {
  var instance = clobber(Spacetime.tomorrow())
  instance.clone = x=> clobber(Spacetime.tomorrow())
  return instance
}

ImmutableSpacetime.yesterday = function yesterday(tz) {
  let s = clobber(new Spacetime(new Date().getTime(), tz));
  let instance = clobber(s.subtract(1, 'day').startOf('day'));
  instance.clone = x=> clobber(s.subtract(1, 'day').startOf('day'));
  return instance;
};

//find tz by time
ImmutableSpacetime.whereIts = whereIts;

//this is handy
ImmutableSpacetime.version = pkg.version;

// coolest sounding exports ever
module.exports = ImmutableSpacetime
