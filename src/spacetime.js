import guessTz from './timezone/guessTz'
import timezone from './timezone'
import handleInput from './input'
import methods from './methods'
import * as query from './methods/query'
import * as add from './methods/add'
import * as same from './methods/same'
import * as compare from './methods/compare'
import * as i18n from './methods/i18n'

//fake timezone-support, for fakers (es5 class)
export default function SpaceTime (input, tz) {
  //the shift for the given timezone
  this.tz = tz || guessTz()
  //don't output anything if it's invalid
  this.valid = true
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
  //parse the various formats
  handleInput(this, input)
}

//(add instance methods to prototype)
Object.keys(methods).forEach(k => {
  SpaceTime.prototype[k] = methods[k]
})

SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz)
}

//append more methods
query.addMethods(SpaceTime)
add.addMethods(SpaceTime)
same.addMethods(SpaceTime)
compare.addMethods(SpaceTime)
i18n.addMethods(SpaceTime)
