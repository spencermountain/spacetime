import config from './config.js'
import toEpoch from './parse/index.js'
import methods from './api/index.js'

const SpaceTime = function (input, tz) {
  //the holy UNIX moment
  this.epoch = toEpoch(input)
  //the shift for the given timezone
  this.tz = tz || config.fallbackTz
}

Object.assign(SpaceTime.prototype, methods)

// add method aliases
const aliases = [
  ['hours', 'hour'],
  ['minutes', 'minute'],
  ['seconds', 'second'],
]
aliases.forEach(a => {
  SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]]
})

export default SpaceTime