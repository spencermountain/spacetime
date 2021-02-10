const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))

//
//
//
//

// let d = spacetime('2018-10-01')
// d = d.startOf('quarter')
// d = d.add(1, 'quarter')
// d = d.endOf('quarter')

// let d = spacetime('2020-10-01')
// d = d.endOf('quarter')
// console.log(d.format())

// let d = spacetime('2018-11-01')
// // // d = d.startOf('quarter').add(1, 'quarter')
// d = d.endOf('quarter')
// console.log(d.format())

let d = spacetime('2019-10-01')
d = d.minus(8, 'quarter')
console.log(d.format(), 'end')

// let d = spacetime('2017-03-01')
// d = d.minus(1, 'quarter')
// d = d.minus(1, 'quarter')
// d = d.minus(1, 'quarter')
// d = d.minus(1, 'quarter')
// console.log(d.format())
// d = d.add(1, 'quarter')
// d = d.add(1, 'quarter')
// d = d.add(1, 'quarter')
// d = d.add(1, 'quarter')
// console.log(d.format())
