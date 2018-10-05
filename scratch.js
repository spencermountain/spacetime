const spacetime = require('./src/index')

// var minus = spacetime('2018-07-09T12:59:00-07:00');
// console.log(minus.format('iso'));

// let s=spacetime('June 8th 1918').time('4:00pm').goto('Asia/Calcutta')
// console.log( s.format('iso'))
// console.log(spacetime.now().goto('America/New_York').format('iso'))
// console.log(spacetime.now().goto('America/New_York').format('iso'))
// console.log('2018-09-01T13:47:16-04:00')


// const day = spacetime('2018-09-23')
// console.log(day.format('time') + '\n')

// day.time('06:00')
// console.log(day.format('iso'))
// console.log(day.format('time'))


let a = spacetime('2018-10-21').goto('America/Adak').add(1, 'week')
let b = spacetime('2018-10-22').goto('America/Adak').add(1, 'week')
// console.log(a.format('iso'))
// console.log(b.format('iso'))
console.time('diff')
console.log(a.diff(b, 'second'))
console.timeEnd('diff')
console.log('--')

// bug (from mexico city)
// let s = spacetime([2017, 5, 25]);
// s.quarter('q2')
// console.log(s.format('nice'))
