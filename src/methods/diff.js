const fns = require('../fns')
const diffAll = require('./diffQuick')

//init this function up here
let doAll = () => {}
//increment until dates are the same
const climb = (a, b, unit) => {
  let i = 0
  a = a.clone()
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit)
    i += 1
  }
  //oops, we went too-far..
  if (a.isAfter(b, unit)) {
    i -= 1
  }
  return i
}

//these small units can just be 'eyeballed'
//it's way too slow to do them procedurally
const diffQuick = (a, b) => {
  let ms = b.epoch - a.epoch
  let obj = {
    milliseconds: ms,
    seconds: parseInt(ms / 1000, 10)
  }
  obj.minutes = parseInt(obj.seconds / 60, 10)
  obj.hours = parseInt(obj.minutes / 60, 10)
  obj.days = parseInt(obj.hours / 24, 10)
  obj.weeks = parseInt(obj.days / 7, 10)
  return obj
}

const diff = (a, b, unit) => {
  //remove trailing s
  b = fns.beADate(b, a)
  if (!unit) {
    return doAll(a, b)
  }
  //make sure it's plural-form
  unit = fns.normalize(unit)
  if (/s$/.test(unit) !== true) {
    unit += 's'
  }
  //do quick-form for these small-ones
  const quick = diffQuick(a, b)
  if (unit === 'milliseconds' || unit === 'seconds' || unit === 'minutes') {
    return quick[unit]
  }
  //do the fast version for large months
  if (unit === 'months' && quick.weeks > 364) {
    return doAll(a, b).months
  }
  //otherwise, do full-version
  if (a.isBefore(b)) {
    return climb(a, b, unit)
  } else {
    //reverse it
    return climb(b, a, unit) * -1
  }
}

doAll = (a, b) => {
  let reversed = false
  if (a.isAfter(b)) {
    let tmp = a
    a = b
    b = tmp
    reversed = true
  }
  let obj = diffAll(a, b)
  //reverse values, if necessary
  if (reversed === true) {
    Object.keys(obj).forEach(k => {
      obj[k] *= -1
    })
  }
  return obj
}
module.exports = diff
