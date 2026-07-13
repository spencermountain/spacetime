import spacetime from '../../src/index.js'
import weekStartPlugin from './src/index.js'

spacetime.extend(weekStartPlugin)
const d = spacetime.now('Europe/Berlin')
console.log(d.weekStart()) // { day: 'monday', country: 'germany' }
console.log(d.weekStart('iran')) // { day: 'saturday', country: 'iran' }
