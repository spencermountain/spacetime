'use strict';

const add = function(d, num, unit) {
  if (unit === 'hour' || unit === 'hours') {
    d.setHours(d.getHours() + num);
    return d;
  }
  if (unit === 'day' || unit === 'days') {
    d.setDate(d.getDate() + num);
    return d;
  }
  if (unit === 'week' || unit === 'weeks') {
    d.setDate(d.getDate() + (num * 7));
    return d;
  }
  if (unit === 'month' || unit === 'months') {
    d.setMonth(d.getMonth() + num);
    return d;
  }
  if (unit === 'quarter' || unit === 'quarters') {
    d.setMonth(d.getMonth() + (num * 3));
    return d;
  }
  if (unit === 'year' || unit === 'years') {
    d.setFullYear(d.getFullYear() + num);
    return d;
  }
  console.warn('no unit: \'' + unit + '\'');
  return d;
};


const addMethods = (Space) => {

  const methods = {
    add: function(num, unit) {
      let d = add(this.d, num, unit);
      this.epoch = d.getTime();
      return this;
    },
    subtract: function(num, unit) {
      let d = add(this.d, num * -1, unit);
      this.epoch = d.getTime();
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
