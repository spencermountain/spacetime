const spacetime = require('./src/index')

// var minus = spacetime('2018-07-09T12:59:00-07:00');
// console.log(minus.format('iso'));

// let s=spacetime('June 8th 1918').time('4:00pm').goto('Asia/Calcutta')
// console.log( s.format('iso'))
// console.log(spacetime.now().goto('America/New_York').format('iso'))
// console.log(spacetime.now().goto('America/New_York').format('iso'))
// console.log('2018-09-01T13:47:16-04:00')

var s = spacetime('2018-07-09T12:59:00.362Z');
console.log(s.timezone())
console.log(s.format('iso'))
