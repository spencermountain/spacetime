import { isObject, isBoolean } from '../fns.ts'
import { set as setD } from '../data/days.ts'
import { set as setM } from '../data/months.ts'
import { set as setTcf } from '../data/caseFormat.ts'
import { set as setAmpm } from '../data/ampm.ts'
import { set as setDistance } from '../data/distance.ts'
import { set as setUnits } from '../data/units.ts'
import type { I18n } from '../types/index.ts'

const methods = {
  i18n: function (data: I18n) {
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

export default methods
