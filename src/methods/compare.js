'use strict';
const fns = require('../fns');

const addMethods = SpaceTime => {
  const methods = {
    isAfter: function(d) {
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch > epoch;
    },
    isBefore: function(d) {
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch < epoch;
    },
    isEqual: function(d) {
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch === epoch;
    },
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;
