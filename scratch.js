'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

//bug. 1
let s = spacetime('2016-01-01T9:00:00:122Z', 'Canada/Eastern');
console.log(s.format().iso.local);
//
// spacetime.today();

//bug 2.
// let d = new Date('March 11, 2017');
// let s = spacetime(d);
// console.log(s.timezone());
// s.log();


// let rightSide = spacetime([2022, 8, 24, 4, 1], 'Pacific/Fiji');
// //try move across dateline (to left side of the map)
// let leftSide = rightSide.clone().goto('Pacific/Midway');
//
// console.log('right: ' + rightSide.format().nice.long);
// console.log('left: ' + leftSide.format().nice.long);
//
// console.log(leftSide.isEqual(rightSide.epoch));
