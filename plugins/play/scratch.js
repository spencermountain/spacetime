import spacetime from 'spacetime'
import plugin from './src/index.js'

spacetime.extend(plugin)

const s = spacetime.now()
s.play()
