const spacetime = require('./src/index')

// let start = spacetime('April 6th 2019')
// let end = spacetime('April 7th 2019')
// start.every('tuesday', end).map(s => {
//   console.log(s.format('nice'))
// })

console.log(
  spacetime
    .now()
    .next('wednesday')
    .format('nice-day')
)
