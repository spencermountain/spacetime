'use strict';
const format = require('./methods/format');
const progress = require('./methods/progress');
const diff = require('./methods/diff');
const ends = require('./methods/startOf');
const timezone = require('./timezone/index');
const handleInput = require('./input');

//the spacetime instance methods (also, the API)
module.exports = {
  set: function(input) {
    handleInput(this, input);
    return this;
  },
  timezone: function() {
    return timezone(this);
  },
  isDST: function() {
    return timezone(this).current.isDst;
  },
  hasDST: function() {
    return timezone(this).dst.change !== 0;
  },
  offset: function() {
    return timezone(this).current.offset / 60;
  },

  format: function(fmt) {
    return format(this, fmt);
  },
  startOf: function(unit) {
    return ends.startOf(this, unit);
  },
  endOf: function(unit) {
    return ends.endOf(this, unit);
  },
  leapYear: function() {
    let year = this.year();
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  },
  progress: function() {
    return progress(this);
  },
  diff: function(d, unit) {
    return diff(this, d, unit);
  },
  isValid: function() {
    return !isNaN(this.d.getTime());
  },
  //travel to this timezone
  goto: function(tz) {
    this.tz = tz; //science!
    return this;
  },
  isAsleep: function() {
    let hour = this.hour();
    if (hour < 8 || hour > 22) { //10pm -> 8am
      return true;
    }
    return false;
  },
  //pretty-printing
  log: function() {
    console.log('');
    console.log(format(this).nice.short);
    return this;
  },
  logYear: function() {
    console.log('');
    console.log(format(this).date.short + ' ' + this.year());
    return this;
  }
};
