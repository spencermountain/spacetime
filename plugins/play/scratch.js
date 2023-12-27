import spacetime from 'spacetime'
import plugin from './src/index.js'

spacetime.extend(plugin)

let s = spacetime.now()
s.play()
