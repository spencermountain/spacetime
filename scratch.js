const spacetime = require('./src/index')

// var minus = spacetime('2018-07-09T12:59:00-07:00');
// console.log(minus.format('iso'));

let s=spacetime.now().goto('Asia/Calcutta')
console.log( s.format('iso'))
