'use strict';
const getBias = require('./getBias');
const guessTz = require('./timezone/guessTz');
const timezone = require('./timezone/index');
const format = require('./methods/format');
const progress = require('./methods/progress');
const diff = require('./methods/diff');
const ends = require('./methods/startOf');
const handleInput = require('./input');


//fake timezone-support, for fakers
class SpaceTime {
  constructor(input, tz) {
    //the shift for the given timezone
    this.tz = tz || guessTz();
    //this computer's built-in offset
    this.bias = getBias();
    //parse the various formats
    handleInput(this, input);
  }
  set(input) {
    handleInput(this, input);
    return this;
  }
  timezone() {
    return timezone(this);
  }
  format() {
    return format(this);
  }
  startOf(unit) {
    return ends.startOf(this, unit);
  }
  endOf(unit) {
    return ends.endOf(this, unit);
  }
  leapYear() {
    let year = this.year();
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }

  log() {
    console.log('');
    console.log(format(this).nice.short);
    return this;
  }
  logYear() {
    console.log('');
    console.log(format(this).date.short + ' ' + this.year());
    return this;
  }
  progress() {
    return progress(this);
  }
  diff(d, unit) {
    return diff(this, d, unit);
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
    return !isNaN(this.d.getTime());
  }

  clone() {
    return new SpaceTime(this.epoch, this.tz);
  }

  //travel to this timezone
  goto(tz) {
    this.tz = tz;
    // let meta = timezone(this);
    // //current offset in minutes
    // this.offset = meta.current.offset;
    return this;
  }
}
//append methods
SpaceTime = require('./methods/query')(SpaceTime);
SpaceTime = require('./methods/add')(SpaceTime);
SpaceTime = require('./methods/same')(SpaceTime);
SpaceTime = require('./methods/compare')(SpaceTime);

module.exports = SpaceTime;
