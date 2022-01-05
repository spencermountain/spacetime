import { isObject, isBoolean } from '../fns.js'
import { set } from '../data/days.js'
import { set as _set } from '../data/months.js'
import { set as __set } from '../data/caseFormat.js'


const addMethods = SpaceTime => {
  const methods = {
    i18n: data => {
      //change the day names
      if (isObject(data.days)) {
        set(data.days)
      }
      //change the month names
      if (isObject(data.months)) {
        _set(data.months)
      }

      // change the the display style of the month / day names
      if (isBoolean(data.useTitleCase)) {
        __set(data.useTitleCase)
      }
    }
  }

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k]
  })
}

export default addMethods
