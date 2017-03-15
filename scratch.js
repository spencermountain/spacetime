'use strict';
const spacetime = require('./src');
let s;

// ISO Date	"2015-03-25" (The International Standard)
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"

// s = spacetime('March 28, 1999 20:42:00', 'Africa/Algiers');
// s = spacetime('March 14, 2017 22:48:00', 'Canada/Pacific');
// s = spacetime('March 14, 2017 22:48:00', 'Africa/Algiers');
// s = spacetime([2017, 2, 14, 22, 48], 'Africa/Algiers');
s = spacetime('25 Mar 2015', 'Africa/Algiers');
// s.goto('');
s.log();
// console.log(s.format());
// s.endOf('month').log();
// let end = spacetime('March 31, 1999 23:59:59', 'Canada/Pacific');
// end.millisecond(999);
// end.log();
//
//
// console.log(s.format().iso.local);
// console.log(end.format().iso.local);
