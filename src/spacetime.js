'use strict';
const getBias = require('./getBias');
const guessTz = require('./timezone/guessTz');
const timezone = require('./timezone/index');
const format = require('./methods/format');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(input, tz) {
    //the shift for the given timezone
    this.tz = tz || guessTz();
    //this computer's built-in offset
    this.bias = getBias();

    if (typeof input === 'number') {
      this.epoch = input;
    } else {
      let d = new Date(input);
      this.epoch = d.getTime();
      let meta = timezone(this);
      this.epoch = d.getTime() - meta.current.epochShift;
    }
  }
  timezone() {
    return timezone(this);
  }
  format() {
    return format(this);
  }

  //a js date object
  get d() {
    let meta = timezone(this);
    //movement in milliseconds
    let shift = meta.current.epochShift;
    //remove this computer's offset
    shift = shift + (this.bias * 60 * 1000);
    let epoch = this.epoch + shift;
    let d = new Date(epoch);
    return d;
  }

  isValid() {
    return isNaN(this.d.getTime());
  }

  clone() {
    return new SpaceTime(this.epoch, this.tz);
  }

  //travel to this timezone
  goto(tz) {
    this.tz = tz;
    let meta = timezone(this);
    //current offset in minutes
    this.offset = meta.current.offset;
    return this;
  }
}
//append methods
SpaceTime = require('./methods/query')(SpaceTime);
SpaceTime = require('./methods/move')(SpaceTime);
SpaceTime = require('./methods/same')(SpaceTime);

module.exports = SpaceTime;
