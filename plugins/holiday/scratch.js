// const spacetimeHoliday = require('./builds/spacetime-holiday.js')
const spacetimeHoliday = require('./src')

let s = spacetimeHoliday('ramadan', 2019, 'Canada/Pacific')
console.log(s.format('iso'))
