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


//bug
// console.log(spacetime.now('Asia/Choibalsan').time())
// console.log(spacetime.now('Asia/Ulaanbaatar').time())

// bug
let s = spacetime([2022, 8, 24], 'Pacific/Midway');
s.hour(1)
console.log(s.time())
