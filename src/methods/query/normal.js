'use strict';
const set = require('../set/set');

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
  hour12: function(str) {
    let d = this.d;
    if (str !== undefined) {
      str = '' + str;
      let m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (m[2] === 'pm') {
          hour += 12;
        }
        this.epoch = set.hours(this, hour);
      }
      return this;
    }
    //get the hour
    let hour12 = d.getHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12;
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
  dayTime: function(str) {
    if (str !== undefined) {
      const times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm',
      };
      str = str || '';
      str = str.toLowerCase();
      if (times[str]) {
        this.time(times[str]);
      }
      return this;
    }
    let h = this.hour();
    if (h < 6) {
      return 'night';
    }
    if (h < 12) { //until noon
      return 'morning';
    }
    if (h < 17) { //until 5pm
      return 'afternoon';
    }
    if (h < 22) { //until 10pm
      return 'evening';
    }
    return 'night';
  },
  dayOfYear: function(num) {
    if (num !== undefined) {
      this.epoch = set.dayOfYear(this, num);
      return this;
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    let sum = 0;
    let month = this.d.getMonth();
    let tmp;
    for(let i = 0; i < month; i++) {
      tmp = new Date();
      tmp.setMonth(i);
      tmp.setDate(1);
      tmp.setHours(-2);
      sum += tmp.getDate();
    }
    return sum + this.d.getDate();
  }
};
//aliases
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.hour24 = methods.hour;
methods.h12 = methods.hour12;
methods.h24 = methods.hour24;
methods.days = methods.day;

module.exports = methods;
