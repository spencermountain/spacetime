'use strict';
const months = require('./lib/months');
const days = require('./lib/days');
const quarters = require('./lib/quarters');

const addMethods = (Space) => {

  const methods = {

    date: function(num) {
      if (num !== undefined) {
        this.d.setDate(num);
        return this;
      }
      return this.d.getDate();
    },

    hour: function(num) {
      if (num !== undefined) {
        this.d.setHours(num);
        return this;
      }
      return this.d.getHours();
    },

    minute: function(num) {
      if (num !== undefined) {
        this.d.setMinutes(num);
        return this;
      }
      return this.d.getMinutes();
    },

    //since the start of the year
    week: function(num) {
      if (num !== undefined) {
        this.month(0);
        this.date(1);
        this.day(1); //monday
        num -= 1; //1-based
        this.add(num, 'weeks');
        return this;
      }
      //find-out which week it is
      let tmp = this.clone();
      tmp.month(0);
      tmp.date(1);
      tmp.hour(0);
      tmp.minute(1);
      tmp.day(1); //monday
      const thisOne = this.epoch();
      //if the week technically hasn't started yet
      if (tmp.epoch() > thisOne) {
        return 1;
      }
      for(let i = 0; i < 52; i++) {
        if (tmp.epoch() > thisOne) {
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

    year: function(num) {
      if (num !== undefined) {
        this.d.setFullYear(num);
        return this;
      }
      return this.d.getFullYear();
    },

    month: function(input) {
      if (input !== undefined) {
        if (typeof input === 'number') {
          this.d.setMonth(input);
          return this;
        }
        //input by month name
        input = input.toLowerCase();
        let index = months.short.indexOf(input);
        if (index === -1) {
          index = months.long.indexOf(input);
        }
        if (index !== -1) {
          this.d.setMonth(index);
          return this;
        }
      }
      return months.long[this.d.getMonth()];
    },

    day: function(input) {
      if (input === undefined) {
        return days.long[this.d.getDay()];
      }
      let num = input;
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
      let current = this.d.getDay();
      if (num > current) {
        let diff = num - current;
        this.d.setDate(this.d.getDate() + diff);
      } else if (num < current) {
        let toAdd = num + (7 - current);
        this.d.setDate(this.d.getDate() + toAdd);
      }
      return this;

    },

  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
