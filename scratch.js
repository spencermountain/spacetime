const spacetime = require('./src/index')

// var minus = spacetime('2018-07-09T12:59:00-07:00');
// console.log(minus.format('iso'));
//
// console.log('------------');
//
// var plus = spacetime('2018-07-09T12:59:00+07:00');
// console.log(plus.format('iso'));

// console.log(spacetime('April 3rd \'19').format('nice'))
// console.log(spacetime('1899').format('full'))
// console.log(spacetime('200 BC').format('full'))

// let s = spacetime('200 BC')s
let now = spacetime.now()
let then = spacetime.now().minus(30, 'days')

console.time('hi')
console.log(now.diff(then))
console.timeEnd('hi')
