import getDst from '../dst/index.js'
import { getYear } from '../_lib/yearStart.js'
import walkUp from './walk-up.js'

const getOffset = function (tz, epoch) {
  let { year } = getYear(epoch)
  let dst = getDst(tz, year)
  let offset = dst.offset
  // are we in dst now?
  if (dst.start && epoch >= dst.start && epoch < dst.end) {
    offset += 1
  }
  return offset
}

const fromEpoch = function (epoch, tz) {

  let cal = walkUp(epoch)
  console.log(cal)
}
export default fromEpoch