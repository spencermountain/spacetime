const spacetime = require('./src/index')

// var minus = spacetime('2018-07-09T12:59:00-07:00');
// console.log(minus.format('iso'));
//
// console.log('------------');
//
// var plus = spacetime('2018-07-09T12:59:00+07:00');
// console.log(plus.format('iso'));

console.log(spacetime('April 3rd').format('nice'))
console.log(spacetime('3rd June').format('nice'))
console.log(spacetime('03/28').format('nice'))
// console.log(spacetime('April 3rd').format('nice'))
// console.log(spacetime('200 BC').format('nice'))
