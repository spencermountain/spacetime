import format from './methods/format'
import progress from './methods/progress'
import nearest from './methods/nearest'
import diff from './methods/diff'
import {startOf, endOf} from './methods/startOf'
import timezone from './timezone/index'
import handleInput from './input'

//the spacetime instance methods (also, the API)
const methods = {
  set (input) {
    handleInput(this, input)
    return this
  },
  timezone () {
    return timezone(this)
  },
  isDST () {
    return timezone(this).current.isDST
  },
  hasDST () {
    return timezone(this).hasDst
  },
  offset () {
    return timezone(this).current.offset / 60
  },
  hemisphere () {
    return timezone(this).hemisphere
  },

  format (fmt) {
    return format(this, fmt)
  },
  startOf (unit) {
    return startOf(this, unit)
  },
  endOf (unit) {
    return endOf(this, unit)
  },
  leapYear () {
    let year = this.year()
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  },
  progress () {
    return progress(this)
  },
  nearest (unit) {
    return nearest(this, unit)
  },
  diff (d, unit) {
    return diff(this, d, unit)
  },
  isValid () {
    return this.valid && !isNaN(this.d.getTime())
  },
  //travel to this timezone
  goto (tz) {
    this.tz = tz //science!
    return this
  },
  isAsleep () {
    let hour = this.hour()
    if (hour < 8 || hour > 22) {
      //10pm -> 8am
      return true
    }
    return false
  },
  //pretty-printing
  log () {
    console.log('')
    console.log(format(this, 'nice-short'))
    return this
  },
  logYear () {
    console.log('')
    console.log(format(this, 'full-short'))
    return this
  }
}

//aliases
methods.inDST = methods.isDST
methods.round = methods.nearest

export default methods
