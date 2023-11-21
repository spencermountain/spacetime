import { isObject, isBoolean } from '../fns.js'
import { set as setD } from '../data/days.js'
import { set as setM } from '../data/months.js'
import { set as setTcf } from '../data/caseFormat.js'
import { set as setAmpm } from '../data/ampm.js'
import { set as setDistance } from '../data/distance.js'
import { set as setUnits } from '../data/units.js'

const addMethods = SpaceTime => {
  const methods = {
    i18n: function (data) {
      //change the day names
      if (isObject(data.days)) {
        setD(data.days)
      }
      //change the month names
      if (isObject(data.months)) {
        setM(data.months)
      }

      //change the display style of the month / day names
      if (isBoolean(data.useTitleCase)) {
        setTcf(data.useTitleCase)
      }

      //change am and pm strings
      if (isObject(data.ampm)) {
        setAmpm(data.ampm)
      }

      //change distance strings
      if(isObject(data.distance)){
        setDistance(data.distance)
      }

      //change units strings
      if(isObject(data.units)){
        setUnits(data.units)
      }

      return this
    }
  }

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k]
  })
}

export default addMethods
