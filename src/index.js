'use strict';
const Spacetime = require('./spacetime');
const pkg = require('../package.json');

const main = function(input, tz) {
  return new Spacetime(input, tz);
};

//some helper fns
main.now = function(tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function(tz) {
  let space = new Spacetime(new Date().getTime(), tz);
  return space.startOf('day');
};
main.tomorrow = function(tz) {
  let space = new Spacetime(new Date().getTime(), tz);
  return space.add(1, 'day').startOf('day');
};

//this is handy
main.version = pkg.version;

module.exports = main;
