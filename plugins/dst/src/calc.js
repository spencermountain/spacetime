const spacetime = require('../../../src')
// USA:
// 	Spring: 2nd Sunday in March  - skip 2am.
// 	Fall: 1st Sunday in November  -  repeat 2am.
// EU:
// 	Spring: last Sunday in March.
// 	Fall: last Sunday in October.

let zone = {
  // last Sunday in March
  start: {
    day: 'sunday',
    num: 'last',
    month: 'march'
    // hour: ()=>{}
  },
  // the last Sunday in October.
  end: {
    day: 'sunday',
    num: 'last',
    month: 'october'
    // hour: ()=>{}
  }
}
// last sunday of the month, eg
const findLast = function (s, obj) {
  s = s.endOf('month')
  s = s.day(obj.day, false) //backward
  s = s.hour(obj.hour)
  return s.format('iso')
}

const findEpoch = function (obj, tz, year) {
  let s = spacetime.now(tz)
  s = s.year(year).month(obj.month).startOf('month')
  // compute 'last'
  if (obj.num === 'last') {
    return findLast(s, obj)
  }
  // otherwise, compute nth
  s = s.day(obj.day, true) //1st
  s = s.add(obj.num - 1, 'week')
  s = s.hour(obj.hour)
  // s = s.minus(1, 'second')
  return s.format('iso')
}

// 2020	  -  Sunday, March 8, 2:00am	  -  	Sunday, November 1, 2:00 am
// 2021	  -  Sunday, March 14, 2:00am	  -  	Sunday, November 7, 2:00 am
// 2022	  -  Sunday, March 13, 2:00am	  -  	Sunday, November 6, 2:00 am
// 2023	  -  Sunday, March 12, 2:00am	  -  	Sunday, November 5, 2:00 am
// 2024	  -  Sunday, March 10, 2:00am	  -  	Sunday, November 3, 2:00 am

const calc = function (id, year) {
  return {
    start: findEpoch(zone.start, id, year),
    end: findEpoch(zone.end, id, year)
  }
}
export default calc
