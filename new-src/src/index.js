
import fromEpoch from './fromEpoch/index.js'


const now = function (tz) {
  let epoch = new Date().getTime()//
  return fromEpoch(epoch, tz)
}


export { now, fromEpoch }