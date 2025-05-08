// const spacetimeHoliday = require('./builds/spacetime-holiday.js')
import spacetimeHoliday from './src'

const s = spacetimeHoliday('ramadan', 2019, 'Canada/Pacific')
console.log(s.format('iso'))
