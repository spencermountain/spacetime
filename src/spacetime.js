import parse from './01-one/parse/index.js'
import methods from './01-one/api/index.js'

const SpaceTime = function (input, tz) {
  let res = parse(input, tz)
  //the holy UNIX moment
  this.epoch = res.epoch
  //the IANA code for the current timezone
  this.tz = res.tz
}
// builder/factory
SpaceTime.prototype._from = function (input, tz) {
  return new SpaceTime(input, tz || this.tz)
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