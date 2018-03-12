const spacetime = require('./src/index')

// let s = spacetime([2017, 3, 28]) //.subtract(23, 'days')
// console.log(s.since([2018, 3, 28]))

let s = spacetime('December 30th 2016', null, {
  silent: true
})
s.log()
// returns 1
// console.log(spacetime('January 1 2017').since('December 31 2016').diff)
// returns {years:0, months:0, days:1}
