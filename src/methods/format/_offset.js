const fns = require('../../fns');

// "+01:00", "+0100", or simply "+01"
const isoOffset = function(s) {
  let offset = s.timezone().current.offset
  let minute = '00'
  if (offset % 1 === 0.5) { //fraction of the hour
    minute = '30'
    offset = Math.floor(offset)
  }
  if (offset < 0) {
    //handle negative sign
    offset *= -1
    offset = fns.zeroPad(offset, 2)
    offset = '-' + offset
  } else {
    offset = fns.zeroPad(offset, 2)
    offset = '+' + offset
  }
  offset = offset + ':' + minute
  //this is a little cleaner?
  if (offset === "+00:00") {
    offset = 'Z'
  }
  return offset
}

module.exports = isoOffset
