'use strict';
const getBias = require('./getBias');
const guessTz = require('./timezone/guessTz');
const timezone = require('./timezone/index');
const zones = require('../data/zonefile.2017.json');
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
      let meta = this.timezone();
      this.epoch = d.getTime() - meta.milliseconds;
    }
  }
  timezone() {
    return timezone(this);
  }
  format() {
    return format(this);
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

module.exports = SpaceTime;
