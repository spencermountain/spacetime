'use strict';
const getOffset = require('./gears/getOffset');
const getBias = require('./gears/getBias');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(epoch, tz) {
    //default to now
    this.epoch = epoch || new Date().getTime();
    //the shift for the given timezone
    this.offset = getOffset(tz);
    this.tz = tz;
    //this computer's built-in offset
    this.bias = getBias();
  }

  //a js date object
  get d() {
    //movement in milliseconds
    let shift = (this.offset * 60 * 1000);
    //remove this computer's offset
    shift = shift + (this.bias * 60 * 1000);
    let epoch = this.epoch + shift;
    //delete this after..
    Date.prototype.log = function() {
      console.log(this.toLocaleDateString().replace(/\/[0-9]{4}/, '') + '  -  ' + this.toLocaleTimeString());
    };
    let d = new Date(epoch);
    return d;
  }

  clone() {
    return new SpaceTime(this.epoch, this.tz);
  }

  //travel to this timezone
  goto(tz) {
    this.tz = tz;
    this.offset = getOffset(tz);
    return this;
  }
}
//append methods
SpaceTime = require('./methods/query')(SpaceTime);
SpaceTime = require('./methods/move')(SpaceTime);
SpaceTime = require('./methods/same')(SpaceTime);
SpaceTime = require('./methods/format')(SpaceTime);

module.exports = SpaceTime;
