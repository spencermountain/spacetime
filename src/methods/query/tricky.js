'use strict';
const days = require('../../data/days');
const months = require('../../data/months');
const walkTo = require('../set/walk');

//non-destructive getters/setters with fancy moves to do
module.exports = {
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
      want = days.short().indexOf(input);
      if (want === -1) {
        want = days.long().indexOf(input);
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
      second: original.second()
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

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days.long()[this.day()];
    }
    this.day(input);
    return this;
  },

  monthName: function(input) {
    if (input === undefined) {
      return months.long()[this.month()];
    }
    this.month(input);
    return this;
  }
};
