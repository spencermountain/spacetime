'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

// let s = spacetime(null, 'Australia/Canberra');
// console.log(s.season());

// console.log(spacetime.whereIts('9am'));
console.log(spacetime.whereIts('9:55am', '10am'));
