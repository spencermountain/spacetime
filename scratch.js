const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))

//
//
//
//

// let year = 2020
// let start = spacetime('dec 1 ' + year)
// let end = spacetime('jan 20 ' + (year + 1))
// start.every(end, 'week').forEach((d) => {
//   console.log(d.format(), d.week())
// })

console.log(spacetime().isSame('year', spacetime.now()))

// bug:
// console.log(spacetime('2022-01-03').week())

/*
2020-12-07 50
2020-12-14 51
2020-12-21 52
2020-12-28 53
2021-01-04 2
2021-01-11 3
2021-01-18 4
*/
