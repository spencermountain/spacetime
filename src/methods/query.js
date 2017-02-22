'use strict';
const months = require('./lib/months');

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

  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
