'use strict';
const getOffset = require('./gears/getOffset');

//fake timezone-support, for fakers
class SpaceTime {
  constructor(epoch, tz) {
    epoch = epoch || new Date().getTime();
    this.d = new Date(epoch);
    this.bias = this.d.getTimezoneOffset() || 0;
    //apply the offset of the timezone
    if (tz) {
      this.goto(tz);
    } else if (typeof Intl !== 'undefined') {
      this.tz = Intl.DateTimeFormat().resolvedOptions().timeZone; //be explicit about where we are, by default
    }
  }
  clone() {
    return new SpaceTime(this.epoch, this.tz);
  }
  epoch() {
    return this.d.getTime();
  }
  //travel to this timezone
  goto(tz) {
    this.tz = tz;
    let offset = getOffset(tz);
    // offset += this.bias;
    //apply offset
    let msOffset = (offset + this.bias) * 60 * 1000;
    let epoch = this.epoch();
    this.d = new Date(epoch + msOffset);
    // this.bias = offset;
    return this;
  }
}
//append methods
SpaceTime = require('./methods/query')(SpaceTime);
SpaceTime = require('./methods/move')(SpaceTime);
SpaceTime = require('./methods/format')(SpaceTime);

module.exports = SpaceTime;
