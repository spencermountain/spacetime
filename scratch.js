// const spacetime = require('./builds/spacetime.cjs')
// import spacetime from './src/index.js'
// import getDst from './new-src/dst/index.js'
// import tzdb from './new-src/tzdb/index.js'
// import zones from './new-src/data/zonefile.2022.js'
import years from '/Users/spencer/mountain/spacetime/new-src/data/byYear.js'
import isLeapYear from './new-src/dst/isLeap.js'

// console.log(getDst('Pacific/Tahiti', 2022))
let year = 1970
let nonLeap = 31536000000
let leap = 31622400000
let epoch = 0
for (let i = 0; i < 50; i += 1) {
  if (epoch !== years[String(year)]) {
    console.log(year + i, i)
    break
  }
  if (isLeapYear(year)) {
    epoch += leap
  } else {
    epoch += nonLeap
  }
  year += 1
}