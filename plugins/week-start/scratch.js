import spacetime from 'spacetime'
import spacetimeWeek from './src/index.js'

spacetime.extend(spacetimeWeek)
const d = spacetime.now('Europe/Berlin')
console.log(d.weekStart('iran'))
