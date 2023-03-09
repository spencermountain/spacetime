import lib from '../02-two/index.js'
import timer from './timer/plugin.js'
import solar from './solar/plugin.js'

lib.plugin(timer)
lib.plugin(solar)

export default lib
