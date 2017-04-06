'use strict';
const Spacetime = require('./spacetime');
const pkg = require('../package.json');

const main = function(input, tz) {
  return new Spacetime(input, tz);
};

//some helper functions on the main method
main.now = function(tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  return s.startOf('day');
};
main.tomorrow = function(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  return s.add(1, 'day').startOf('day');
};
main.yesterday = function(tz) {
  let s = new Spacetime(new Date().getTime(), tz);
  return s.subtract(1, 'day').startOf('day');
};

//this is handy
main.version = pkg.version;

module.exports = main;
