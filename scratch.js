const spacetime = require('./src/index')

let obj = spacetime('April 12th 2018', 'Canada/Eastern').since('April 10th 2018')
console.log(obj)
