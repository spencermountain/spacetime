import units from './unit/index.js'
import debug from './debug.js'
import aliases from './aliases.js'
// import setters from './change/index.js'
import fmt from './format/index.js'
// import add from './add/index.js'
// import compare from './compare/index.js'
// import diff from './diff/index.js'
// import startOf from './change/startOf.js'
// import misc from './unit/misc.js'


let methods = Object.assign({}, units, fmt)
// let methods = Object.assign({}, add, fmts, compare, startOf, misc, diff)

methods.debug = debug

// add-in our method aliases
// Object.keys(aliases).forEach(k => {
//   methods[k] = methods[aliases[k]]
// })

export default methods