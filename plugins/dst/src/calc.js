const spacetime = require('../../../src')
// USA:
// 	Spring: 2nd Sunday in March  - skip 2am.
// 	Fall: 1st Sunday in November  -  repeat 2am.
// EU:
// 	Spring: last Sunday in March.
// 	Fall: last Sunday in October.

let zone = {
  // ids: ['Europe/Paris'],
  ids: ['Canada/Toronto'],
  start: {
    day: 'sunday',
    num: 2,
    month: 'march'
  },
  end: {
    day: 'sunday',
    num: 1,
    month: 'november'
  }
}

const findEpoch = function (obj, tz, year) {
  let s = spacetime.now(tz)
  s = s.year(year).month(obj.month).startOf('month')

  return
}

findEpoch(zone.start, 'America/Toronto', 2021)

// 2020	  -  Sunday, March 8, 2:00am	  -  	Sunday, November 1, 2:00 am
// 2021	  -  Sunday, March 14, 2:00am	  -  	Sunday, November 7, 2:00 am
// 2022	  -  Sunday, March 13, 2:00am	  -  	Sunday, November 6, 2:00 am
// 2023	  -  Sunday, March 12, 2:00am	  -  	Sunday, November 5, 2:00 am
// 2024	  -  Sunday, March 10, 2:00am	  -  	Sunday, November 3, 2:00 am

const calc = function (id, year) {
  return null
}
module.exports = calc
