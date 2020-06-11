const spacetime = require('./src/index')

// let s = spacetime()

let today = {
  month: 3,
  date: 4,
  year: 1996
}
// let s = spacetime.today(null, { today: today })
let s = spacetime({})
console.log(s.format('nice-year'))
