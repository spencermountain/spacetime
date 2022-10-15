import getDst from '../dst/index.js'
import { getYear } from '../_lib/yearStart.js'
import walk from './walk.js'

const fromEpoch = function (epoch, tz) {
  let year = getYear(epoch)
  let dst = getDst(tz, year)
  let offset = dst.offset
  // are we in dst now?
  if (dst.start && epoch >= dst.start && epoch < dst.end) {
    offset += 1
  }
  let cal = walk(epoch, year)
  console.log(dst)
}
export default fromEpoch