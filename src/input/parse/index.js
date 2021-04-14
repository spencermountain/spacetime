const parsers = require('./formats')
const walkTo = require('../../methods/set/walk')

const zeros = {
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}

const parseString = function (s, input, givenTz) {
  //try each text-parse template, use the first good result
  for (let i = 0; i < parsers.length; i++) {
    let m = input.match(parsers[i].reg)
    if (m) {
      // console.log(parsers[i].reg)
      let res = parsers[i].parse(s, m, givenTz)
      // console.log(res)
      if (res !== null) {
        res = Object.assign({}, zeros, res)
        // console.log(res)
        // && res.isValid()) {
        walkTo(s, res)
        return s
      }
    }
  }
  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'")
  }
  s.epoch = null
  return s
}
module.exports = parseString
