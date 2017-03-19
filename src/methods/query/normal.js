'use strict';
const set = require('./set');
const dayOfYear = require('../lib/dayOfYear');

//the most basic get/set methods
let methods = {

  millisecond: function(num) {
    if (num !== undefined) {
      this.epoch = set.milliseconds(this, num);
      return this;
    }
    return this.d.getMilliseconds();
  },
  second: function(num) {
    if (num !== undefined) {
      this.epoch = set.seconds(this, num);
      return this;
    }
    return this.d.getSeconds();
  },
  minute: function(num) {
    if (num !== undefined) {
      this.epoch = set.minutes(this, num);
      return this;
    }
    return this.d.getMinutes();
  },
  hour: function(num) {
    let d = this.d;
    if (num !== undefined) {
      this.epoch = set.hours(this, num);
      return this;
    }
    return d.getHours();
  },
  date: function(num) {
    if (num !== undefined) {
      this.epoch = set.date(this, num);
      return this;
    }
    return this.d.getDate();
  },
  month: function(input) {
    if (input !== undefined) {
      this.epoch = set.month(this, input);
      return this;
    }
    return this.d.getMonth();
  },
  year: function(num) {
    if (num !== undefined) {
      this.epoch = set.year(this, num);
      return this;
    }
    return this.d.getFullYear();
  },
  dayOfYear: function(num) {
    if (num !== undefined) {
      this.epoch = set.dayOfYear(this, num);
      return this;
    }
    return dayOfYear(this.d);
  },

};
//aliases
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.days = methods.day;

module.exports = methods;
