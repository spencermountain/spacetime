import spacetime from '../../../src/index.js'
import { DateTime } from "luxon";
const test = function (epoch, tz) {
  // DateTime.now().setZone('America/New_York').minus({ weeks: 1 }).endOf('day').toISO();
  let d = DateTime.fromMillis(epoch).setZone()
  console.log('lux: ', d.year, d.month, d.day, d.hour)

  let s = spacetime(epoch, tz)
  console.log('spc:', s.year(), s.month(), s.day(), s.hour())
}
test(1636264800000, 'Europe/London')