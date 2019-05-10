const fns = require('../fns')

//round to either current, or +1 of this unit
const nearest = (s, unit) => {
  //how far have we gone?
  let prog = s.progress()
  unit = fns.normalize(unit)
  //fix camel-case for this one
  if (unit === 'quarterhour') {
    unit = 'quarterHour'
  }
  if (prog[unit] !== undefined) {
    // go forward one?
    if (prog[unit] > 0.5) {
      s = s.add(1, unit)
    }
    // go to start
    s = s.startOf(unit)
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'")
  }
  return s
}
module.exports = nearest
