'use strict';

const addMethods = (Space) => {

  const methods = {

    add: function(num, unit) {
      if (unit === 'day' || unit === 'days') {

      }
      if (unit === 'week' || unit === 'weeks') {

      }
    },

  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
