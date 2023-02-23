import config from './config.js'
import parse from './parse/index.js'
import methods from './api/index.js'

const SpaceTime = function (input, tz) {
  let res = parse(input, tz)
  //the holy UNIX moment
  this.epoch = res.epoch
  //the IANA code for the current timezone
  this.tz = tz || res.tz || config.fallbackTz
}

Object.assign(SpaceTime.prototype, methods)

// add method aliases
const aliases = [
  ['hours', 'hour'],
  ['minutes', 'minute'],
  ['seconds', 'second'],
  ['minus', 'subtract'],
  ['plus', 'add'],
]
aliases.forEach(a => {
  SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]]
})


export default SpaceTime