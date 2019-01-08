const isSummer = require('./summerTime')
//
const quickOffset = function(s) {
  let zones = s.timezones
  let obj = zones[s.tz]
  if (obj.dst === undefined) {
    return obj.offset
  }

  //get our two possible offsets
  let jul = obj.offset
  let dec = obj.offset + 1 // assume it's the same for now
  if (obj.hem === 'n') {
    dec = jul - 1
  }
  let split = obj.dst.split('->')
  let inSummer = isSummer(s.epoch, split[0], split[1], jul)
  if (inSummer === true) {
    return jul
  }
  return dec
}
module.exports = quickOffset
