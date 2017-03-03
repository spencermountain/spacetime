'use strict';
const ms = require('./lib/ms');

const addMethods = (Space) => {

  const methods = {
    add: function(num, unit) {
      if (ms[unit] !== undefined) {
        let shift = num * ms[unit];
        this.epoch += shift;
      } else if (unit === 'month' || unit === 'months') {
        let n = this.month();
        this.month(n + num);
      } else if (unit === 'quarter' || unit === 'quarters') {
        let n = this.quarter();
        this.quarter(n + num);
      } else if (unit === 'year' || unit === 'years') {
        let n = this.year();
        this.year(n + num);
      }
      return this;
    },
    subtract: function(num, unit) {
      this.add(num * -1, unit);
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
