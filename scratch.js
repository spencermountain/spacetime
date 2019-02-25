const spacetime = require('./src/index')

let a = spacetime("2019-03-13T18:00:00.000-05:00");
console.log('timestamp:', a);
console.log(a.format('iso'));

let s = spacetime.now('etc/gmt-13')
console.log(s.time())
