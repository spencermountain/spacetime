const spacetime = require('./src/index')

let s = spacetime([2017, 5, 25], 'America/Mexico_City');
// s = s.quarter('q2')
s = s.month('july')
s = s.date('1')
s = s.hour(0);
// s = s.add(25, 'hours')
console.log(s.format('nice'))
