import units from './unit/index.js'
import fmt from './format/index.js'
import add from './change/index.js'
import compare from './compare/index.js'
import debug from './debug.js'
import aliases from './aliases.js'

const now = function () {
  return this._from(null, this.tz)
}

let methods = Object.assign({}, units, fmt, add, compare, { debug, now })

// add-in our method aliases
Object.keys(aliases).forEach(k => {
  methods[k] = methods[aliases[k]]
})

export default methods