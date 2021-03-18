let spacetime = require('spacetime')
const spacetimeWeek = require('./src')

spacetime = spacetime.extend(spacetimeWeek)
let d = spacetime.now('Europe/Berlin')
console.log(d.weekStart('iran'))
