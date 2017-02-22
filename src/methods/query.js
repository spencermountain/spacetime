'use strict';
const months = require('./lib/months');
const days = require('./lib/days');
const fns = require('./lib/fns');

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
        input = fns.titleCase(input);
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
        input = fns.titleCase(input);
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
