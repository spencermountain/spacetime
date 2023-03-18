import lib from '../01-one/index.js'
import goto from './goto/plugin.js'
import zones from './zones/plugin.js'

lib.plugin(goto)
lib.plugin(zones)

export default lib
