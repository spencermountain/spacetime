const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))

//
//
//
//

let d = spacetime().dayName('su')
console.log(d.format('nice-day'))
