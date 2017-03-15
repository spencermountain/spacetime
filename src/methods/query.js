'use strict';
const months = require('./lib/months');
const days = require('./lib/days');
const quarters = require('../lib/quarters');
const seasons = require('../lib/seasons');
const dayTimes = require('./lib/dayTimes');
const set = require('./set');
const dayOfYear = require('./lib/dayOfYear');

const clearMinutes = function(s) {
  s.minute(0);
  s.second(0);
  s.millisecond(1);
};

const addMethods = (Space) => {

  const methods = {

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

    //'3:30' is 3.5
    hourFloat: function(num) {
      if (num !== undefined) {
        let minute = (num % 1);
        minute = minute * 60;
        let hour = parseInt(num, 10);
        this.epoch = set.hours(this, hour);
        this.epoch = set.minutes(this, minute);
        return this;
      }
      let d = this.d;
      let hour = d.getHours();
      let minute = d.getMinutes();
      minute = minute / 60;
      return hour + minute;
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

    date: function(num) {
      if (num !== undefined) {
        this.epoch = set.date(this, num);
        return this;
      }
      return this.d.getDate();
    },

    dayOfYear: function(num) {
      if (num !== undefined) {
        this.epoch = set.dayOfYear(this, num);
        return this;
      }
      return dayOfYear(this.d);
    },

    //since the start of the year
    week: function(num) {
      if (num !== undefined) {
        this.month(0);
        this.date(1);
        this.day(1); //monday
        clearMinutes(this);
        num -= 1; //1-based
        this.add(num, 'weeks');
        return this;
      }
      //find-out which week it is
      let tmp = this.clone();
      tmp.month(0);
      tmp.date(1);
      clearMinutes(tmp);
      tmp.day(1); //monday
      const thisOne = this.epoch;
      //if the week technically hasn't started yet
      if (tmp.epoch > thisOne) {
        return 1;
      }
      for(let i = 0; i < 52; i++) {
        if (tmp.epoch > thisOne) {
          return i;
        }
        tmp.add(1, 'week');
      }
      return 52;
    },

    quarter: function(num) {
      if (num !== undefined && quarters[num]) {
        let month = quarters[num][0];
        this.month(month);
        this.date(1);
        this.hour(0);
        clearMinutes(this);
        return this;
      }
      let month = this.d.getMonth();
      for(let i = 1; i < quarters.length; i++) {
        if (month < quarters[i][0]) {
          return i - 1;
        }
      }
      return 4;
    },
    season: function(input) {
      if (input !== undefined) {
        for(let i = 0; i < seasons.length; i++) {
          if (input === seasons[i][0]) {
            this.month(seasons[i][1]);
            this.date(1);
            this.hour(0);
            clearMinutes(this);
          }
        }
        return this;
      }
      let month = this.d.getMonth();
      for(let i = 0; i < seasons.length - 1; i++) {
        if (month >= seasons[i][1] && month < seasons[i + 1][1]) {
          return seasons[i][0];
        }
      }
      return 'winter';
    },

    year: function(num) {
      if (num !== undefined) {
        let d = this.d;
        d.setFullYear(num);
        this.epoch = d.getTime();
        // this.epoch = set.year(this, num);
        return this;
      }
      return this.d.getFullYear();
    },

    month: function(input) {
      let d = this.d;
      if (input !== undefined) {
        if (typeof input === 'number') {
          d.setMonth(input);
          this.epoch = d.getTime();
          return this;
        }
        //input by month name
        input = input.toLowerCase();
        let index = months.short.indexOf(input);
        if (index === -1) {
          index = months.long.indexOf(input);
        }
        if (index !== -1) {
          d.setMonth(index);
          this.epoch = d.getTime();
          return this;
        }
      }
      return this.d.getMonth();
    },

    monthName: function(input) {
      let d = this.d;
      if (input !== undefined) {
        if (typeof input === 'number') {
          d.setMonth(input);
          this.epoch = d.getTime();
          return this;
        }
        //input by month name
        input = input.toLowerCase();
        let index = months.short.indexOf(input);
        if (index === -1) {
          index = months.long.indexOf(input);
        }
        if (index !== -1) {
          d.setMonth(index);
          this.epoch = d.getTime();
          return this;
        }
      }
      return months.long[this.d.getMonth()];
    },

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

    dayName: function(input) {
      if (input === undefined) {
        return days.long[this.d.getDay()];
      }
      this.day(input);
      return this;
    },

    emoji: function() {
      const seasons = {
        spring: '🌱',
        winter: '⛄',
        summer: '☀️️',
        fall: '🍂',
      };
      const times = {
        breakfast: '🍳',
        morning: '☕',
        noon: '🌞',
        lunch: '🎒',
        afternoon: '🌤️',
        dinner: '🍽️',
        evening: '🌆',
        night: '🛌',
      };
      return {
        time: times[this.timeOfDay()] || '',
        season: seasons[this.season()] || '',
      };
    }

  };

  //aliases
  methods.milliseconds = methods.millisecond;
  methods.seconds = methods.second;
  methods.minutes = methods.minute;
  methods.hours = methods.hour;
  methods.days = methods.day;

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
