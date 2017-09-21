'use strict';
const fns = require('../fns');
const days = require('../data/days');
const months = require('../data/months');

const addMethods = SpaceTime => {
  const methods = {
    i18n: function(data) {
      if (
        !fns.isObject(data) ||
        !fns.isObject(data.days) ||
        !fns.isObject(data.months) ||
        !fns.isArray(data.days.short) ||
        !fns.isArray(data.days.long) ||
        !fns.isArray(data.months.short) ||
        !fns.isArray(data.months.long)
      ) {
        throw new Error('Invalid i18n payload passed.');
      }
      days.set(data.days);
      months.set(data.months);
    },
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;
