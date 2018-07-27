const spacetime = require('./src/index')

var minus = spacetime('2018-07-09T12:59:00-07:00');
console.log(minus.format('iso'));
//
// console.log('------------');
//
var plus = spacetime('2018-07-09T12:59:00+07:00');
console.log(plus.format('iso'));

// var minus = spacetime.now('Etc/GMT-7');
// minus.log()
// console.log(minus.timezone())
