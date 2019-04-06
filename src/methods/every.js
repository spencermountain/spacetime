const fns = require('../fns')
// return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input
const every = function(start, unit = '', to) {
  let result = []
  if (!unit || !to) {
    return result
  }
  //cleanup unit param
  unit = fns.normalize(unit)
  unit = String(unit).toLowerCase()
  unit = unit.replace(/s$/, '') //singular form... :/
  unit = unit.trim()

  //cleanup to param
  to = start.clone().set(to)
  //
  to.log()
  return result
}
module.exports = every
