'use strict';
const getBias = require('./getBias');
const guessTz = require('./timezone/guessTz');
const timezone = require('./timezone/index');
const handleInput = require('./input');
const methods = require('./methods');

//fake timezone-support, for fakers (es5 class)
const SpaceTime = function(input, tz) {
  //the shift for the given timezone
  this.tz = tz || guessTz();
  //this computer's built-in offset
  this.bias = getBias();
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function() {
      let meta = timezone(this) || {};
      //movement in milliseconds
      let shift = meta.current.epochShift;
      //remove this computer's offset
      shift = shift + (this.bias * 60 * 1000);
      let epoch = this.epoch + shift;
      let d = new Date(epoch);
      return d;
    }
  });
  //parse the various formats
  handleInput(this, input);
};

//(add instance methods to prototype)
Object.keys(methods).forEach((k) => {
  SpaceTime.prototype[k] = methods[k];
});
SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz);
};

//append more methods
require('./methods/query')(SpaceTime);
require('./methods/add')(SpaceTime);
require('./methods/same')(SpaceTime);
require('./methods/compare')(SpaceTime);

module.exports = SpaceTime;
