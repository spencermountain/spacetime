'use strict'
import guessTz from './timezone/guessTz'
import timezone from './timezone/index'
import handleInput from './input/index'
import methods from './methods'
import zones from '../data/index'
let zonefile = Object.assign({}, zones)

//fake timezone-support, for fakers (es5 class)
const SpaceTime = function(input, tz, options) {
  options = options || {}
  //the holy moment
  this.epoch = new Date().getTime()
  //the shift for the given timezone
  this.tz = tz || guessTz()
  //whether to output warnings to console
  this.silent = options.silent || false
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function() {
      let meta = timezone(this) || {}
      //every computer is somewhere- get this computer's built-in offset
      let bias = new Date(this.epoch).getTimezoneOffset() || 0
      //movement
      let shift = bias + (meta.current.offset * 60) //in minutes
      shift = shift * 60 * 1000 //in ms
      //remove this computer's offset
      let epoch = this.epoch + shift
      let d = new Date(epoch)
      return d
    }
  })
  //add this data on the object, to allow adding new timezones
  Object.defineProperty(this, 'timezones', {
    get: function() {
      return zonefile
    },
    set: function(obj) {
      zonefile = obj
      return obj
    }
  })
  //parse the various formats
  let tmp = handleInput(this, input, tz, options)
  this.epoch = tmp.epoch
}

//(add instance methods to prototype)
Object.keys(methods).forEach(k => {
  SpaceTime.prototype[k] = methods[k]
})

// ¯\_(ツ)_/¯
SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent
  })
}

//append more methods
import query from './methods/query/index'
query(SpaceTime)
import add from './methods/add'
add(SpaceTime)
import same from './methods/same'
same(SpaceTime)
import compare from './methods/compare'
compare(SpaceTime)
import i18n from './methods/i18n'
i18n(SpaceTime)

export default SpaceTime
