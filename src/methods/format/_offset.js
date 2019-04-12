const fns = require('../../fns')

// "+01:00", "+0100", or simply "+01"
const isoOffset = s => {
  let offset = s.timezone().current.offset
  let minute = '00'
  //handle 5.5 → '5:30'
  if (Math.abs(offset % 1) === 0.5) {
    minute = '30'
    if (offset >= 0) {
      offset = Math.floor(offset)
    } else {
      offset = Math.ceil(offset)
    }
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
  if (offset === '+00:00') {
    offset = 'Z'
  }
  return offset
}

module.exports = isoOffset
