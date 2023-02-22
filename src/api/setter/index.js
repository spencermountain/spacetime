import pop from './pop/index.js'
import roll from './roll/index.js'

// two types of setter methods, roll-to and pop-to methods.
let fns = Object.assign({}, pop, roll)
export default fns