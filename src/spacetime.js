'use strict';
const getOffset = require('./gears/getOffset');
const getBias = require('./gears/getBias');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(input, tz) {
    //the shift for the given timezone
    this.offset = getOffset(tz);
    this.tz = tz;
    //this computer's built-in offset
    this.bias = getBias();

    if (typeof input === 'number') {
      this.epoch = input;
    } else {
      let d = new Date(input);
      this.epoch = d.getTime() - this.shift();
    }
  }
  shift() {
    //movement in milliseconds
    let shift = (this.offset * 60 * 1000);
    //remove this computer's offset
    shift = shift + (this.bias * 60 * 1000);
    return shift;
  }
  //a js date object
  get d() {
    let epoch = this.epoch + this.shift();
    //delete this after..
    Date.prototype.log = function() {
      console.log(this.toLocaleDateString().replace(/\/[0-9]{4}/, '') + '  -  ' + this.toLocaleTimeString());
    };
    let d = new Date(epoch);
    return d;
  }

  here() {
    let d = new Date(this.epoch);
    // d.setYear(this.year());
    // d.setMonth(this.monthNum());
    // d.setDate(this.date());
    // d.setHours(this.hour());
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
