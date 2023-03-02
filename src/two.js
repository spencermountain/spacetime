import lib from './one.js'
import goto from './02-two/goto/plugin.js'
import zones from './02-two/zones/plugin.js'

lib.plugin(goto)
lib.plugin(zones)

export default lib
