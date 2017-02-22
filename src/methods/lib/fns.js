'use strict';

exports.titleCase = function(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase();
};
// console.log(exports.titleCase('feb'));
