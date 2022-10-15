import { getYear } from '../_lib/yearStart.js'
import { SEC, MIN, HOUR, DAY } from '../_lib/millis.js'


const walkUp = function (end) {
  let { start, year } = getYear(end)
  let epoch = start
  let cal = {
    year,
    month: 1,
    date: 1,
    hour: 0,
    second: 0,
    millisecond: 0
  }
  let diff = end - epoch;
  let days = diff / DAY;
  console.log(days)
}
export default walkUp