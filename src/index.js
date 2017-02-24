'use strict';
const Spacetime = require('./spacetime');
const pkg = require('../package.json');

const main = function(input, tz) {
  if (typeof input === 'object' && input.length) {
    input = input.join('-'); //ISO format YYYY-MM-DD
  }
  let d = new Date(input);
  return new Spacetime(d.getTime(), tz);
};

//some helper fns
main.now = function(tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function(tz) {
  let space = new Spacetime(new Date().getTime(), tz);
  return space.morning();
};

//this is handy
main.version = pkg.version;

module.exports = main;
