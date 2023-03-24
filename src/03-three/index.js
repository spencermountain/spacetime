import lib from '../02-two/index.js'
import timer from './timer/plugin.js'
import solar from './solar/plugin.js'
import calendar from './calendar/plugin.js'

lib.plugin(timer)
lib.plugin(solar)
lib.plugin(calendar)

export default lib
