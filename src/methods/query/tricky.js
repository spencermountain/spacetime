'use strict';
const days = require('../lib/days');
const dayTimes = require('../lib/dayTimes');
const months = require('../lib/months');

//non-destructive getters/setters with fancy moves to do
module.exports = {
  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay();
    }
    let num = input;
    //take 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      num = days.short.indexOf(input);
      if (num === -1) {
        num = days.long.indexOf(input);
      }
    }
    //fail silent
    if (typeof num !== 'number' || num < 0 || num > 6) {
      return this;
    }
    //set the day, based on a number
    //always move it forward..
    let d = this.d;
    let current = d.getDay();
    if (num > current) {
      let diff = num - current;
      d.setDate(d.getDate() + diff);
    } else if (num < current) {
      let toAdd = num + (7 - current);
      d.setDate(d.getDate() + toAdd);
    }
    this.epoch = d.getTime();
    return this;
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
