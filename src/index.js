'use strict';
const Spacetime = require('./spacetime');
const whereIts = require('./findTz').whereIts;
const pkg = require('../package.json');

const main = function(input, tz, options) {
  return new Spacetime(input, tz, options);
};

//some helper functions on the main method
main.now = function(tz, options) {
  return new Spacetime(new Date().getTime(), tz, options);
};
main.today = function(tz, options) {
  let s = new Spacetime(new Date().getTime(), tz, options);
  return s.startOf('day');
};
main.tomorrow = function(tz, options) {
  let s = new Spacetime(new Date().getTime(), tz, options);
  return s.add(1, 'day').startOf('day');
};
main.yesterday = function(tz, options) {
  let s = new Spacetime(new Date().getTime(), tz, options);
  return s.subtract(1, 'day').startOf('day');
};
//find tz by time
main.whereIts = whereIts;
//this is handy
main.version = pkg.version;

module.exports = main;
