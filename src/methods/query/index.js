'use strict';
const normal = require('./normal');
const destructive = require('./destructive');
const tricky = require('./tricky');

const addMethods = (Space) => {
  //hook the methods into prototype
  Object.keys(normal).forEach((k) => {
    Space.prototype[k] = normal[k];
  });
  Object.keys(destructive).forEach((k) => {
    Space.prototype[k] = destructive[k];
  });
  Object.keys(tricky).forEach((k) => {
    Space.prototype[k] = tricky[k];
  });
};

module.exports = addMethods;
