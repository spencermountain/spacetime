const spacetime = require('./src/index')

let s = spacetime('March 11, 2017 20:42:00', 'Canada/Eastern');
console.log(s.timezone())
// console.log(s.inDST())
