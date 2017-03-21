'use strict';
const spacetime = require('./src');
let d = spacetime('January 28, 1999 20:42:00', 'Africa/Algiers');
d.subtract(1200, 'month');
d.log();
