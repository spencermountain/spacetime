const fns = require('../fns')
const days = require('../data/days')
const months = require('../data/months')

const addMethods = SpaceTime => {
  const methods = {
    i18n: data => {
      //change the day names
      if (fns.isObject(data.days)) {
        days.set(data.days)
      }
      //change the month names
      if (fns.isObject(data.months)) {
        months.set(data.months)
      }
    }
  }

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k]
  })
}

module.exports = addMethods
