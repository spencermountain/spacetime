'use strict';
const days = require('../../data/days');
const dayTimes = require('../../data/dayTimes');
const months = require('../../data/months');
const set = require('../set/set');
const walkTo = require('../set/walk');

//non-destructive getters/setters with fancy moves to do
module.exports = {

  //
  // //this one's tricky
  // month: (s, n) => {
  //   n = validate(n);
  //   let old = s.clone();
  //   let diff = n - s.month();
  //   let shift = diff * ms.month;
  //   s.epoch += shift;
  //   confirm(s, old, 'date');
  //   return s.epoch;
  // },


  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay();
    }
    let original = this.clone();
    let want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short.indexOf(input);
      if (want === -1) {
        want = days.long.indexOf(input);
      }
    }
    //move approx
    let day = this.d.getDay();
    let diff = day - want;
    let s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second(),
    });
    this.epoch = s.epoch;
    return s;
  },


  ampm: function(input) {
    let which = 'am';
    let hour = this.hour();
    if (hour >= 12) {
      which = 'pm';
    }
    if (input === undefined) {
      return which;
    }
    if (input === which) {
      return this;
    }
    if (input === 'am') {
      this.subtract(12, 'hours');
    } else {
      this.add(12, 'hours');
    }
    return this;
  },

  timeOfDay: function(str) {
    //set the time of day
    if (str !== undefined) {
      this.epoch = set.timeOfDay(this, str);
      return this;
    }
    //which time of day is it?
    let hour = this.hour();
    if (hour < dayTimes[hour]) {
      return 'night';
    }
    let keys = Object.keys(dayTimes);
    for(let i = 0; i < keys.length; i++) {
      if (hour <= dayTimes[keys[i]]) {
        return keys[i];
      }
    }
    return 'night';
  },

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days.long[this.day()];
    }
    this.day(input);
    return this;
  },
  monthName: function(input) {
    if (input === undefined) {
      return months.long[this.month()];
    }
    this.month(input);
    return this;
  },
};
