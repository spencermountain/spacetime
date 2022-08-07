
import { DateTime } from "luxon";
// DateTime.now().setZone('America/New_York').minus({ weeks: 1 }).endOf('day').toISO();
let d = DateTime.fromMillis(1678611600000).setZone('America/New_York')
console.log(d.year, d.month, d.day, d.hour)