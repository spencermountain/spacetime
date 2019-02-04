const spacetime = require('./src/index')

let str = '2019-01-25T20:00:00+01:00'
let a = spacetime(str)
setTimeout(() => {
  console.log(a.isEqual(str))
})
