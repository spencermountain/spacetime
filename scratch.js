const spacetime = require('./src/index')

let s = spacetime([2017, 3, 28]) //.subtract(23, 'days')
// console.log(s.since([2018, 3, 28]))



console.log(s.isAfter([2018, 3, 28]))
