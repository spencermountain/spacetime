import spacetime from 'spacetime'
import spacetimeWeek from './src/index.js'

spacetime.extend(spacetimeWeek)
let d = spacetime.now('Europe/Berlin')
console.log(d.weekStart('iran'))
