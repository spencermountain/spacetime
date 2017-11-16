'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');

let s = spacetime('March 12, 2017 10:05:00', 'Canada/Eastern');
console.log(s.timezone().current.isDST)
