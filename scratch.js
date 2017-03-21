'use strict';
const spacetime = require('./src');
let d = spacetime('March 28, 1999 20:42:00', 'Africa/Algiers');
d.endOf('month');
d.log();

let tmp = d.clone();
tmp.add(1, 'second');

let end = spacetime('March 31, 1999 23:59:59', 'Africa/Algiers');
end.millisecond(999);
end.log();

console.log(d.isSame(end, 'day'));
