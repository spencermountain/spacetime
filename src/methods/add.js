'use strict';
const ms = require('../lib/milliseconds');

const addMethods = (Space) => {

  const methods = {
    add: function(num, unit) {
      if (unit === 'month' || unit === 'months') {
        let n = this.month();
        // console.log('current:', n);
        this.month(n + num);
        return this;
      }
      if (unit === 'quarter' || unit === 'quarters') {
        let n = this.quarter();
        this.quarter(n + num);
        return this;
      }
      if (unit === 'year' || unit === 'years') {
        let n = this.year();
        this.year(n + num);
        return this;
      }
      if (ms[unit] !== undefined) {
        let shift = num * ms[unit];
        this.epoch += shift;
        return this;
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
