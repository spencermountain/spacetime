'use strict';
const getBias = require('./gears/getBias');
const DST = require('./gears/dst');
const guessTz = require('./gears/guessTz');
const timezone = require('./gears/timezone');
const zones = require('../data/zonefile.2017.json');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(input, tz) {
    //the shift for the given timezone
    this.tz = tz || guessTz();
    //this computer's built-in offset
    this.bias = getBias();
    //
    this.offset = this.getOffset();

    if (typeof input === 'number') {
      this.epoch = input;
    } else {
      let d = new Date(input);
      this.epoch = d.getTime() - this.shift();
    }
  }
  timezone() {
    let tz = this.tz || guessTz();
    return timezone(tz);
  }
  dst() {
    return DST(this);
  }
  getOffset() {
    if (!zones[this.tz]) {
      return 0;
    }
    let offset = zones[this.tz].offset;
    if (!this.dst()) {
      return offset - 60;
    }
    return offset;
  }
  //a js date object
  get d() {
    //movement in milliseconds
    let shift = (this.offset * 60 * 1000);
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
