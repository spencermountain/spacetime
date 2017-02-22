'use strict';
const fmt = require('./lib/fmt');
const world = require('./lib/world');

const addMethods = (Space) => {

  const methods = {

    niceTime: function() {
      return fmt.time(this.d);
    },
    niceDate: function() {
      return fmt.day(this.d);
    },
    log: function() {
      console.log(fmt.daytime(this.d));
      return this;
    },
    world: function() {
      return world(this);
    },
  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
