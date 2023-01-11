import diffOne from './one.js'

// don't do anything too fancy here.
// 2020 - 2019 may be 1 year, or 0 years
// - '1 year difference' means 366 days during a leap year
const fastYear = (a, b) => {
  let years = b.year() - a.year()
  // should we decrement it by 1?
  a = a.year(b.year())
  if (a.isAfter(b)) {
    years -= 1
  }
  return years
}

// use a waterfall-method for computing a diff of any 'pre-knowable' units
// compute years, then compute months, etc..
// ... then ms-math for any very-small units
const diff = function (a, b) {
  // an hour is always the same # of milliseconds
  // so these units can be 'pre-calculated'
  let msDiff = b.epoch - a.epoch
  let obj = {
    milliseconds: msDiff,
    seconds: parseInt(msDiff / 1000, 10)
  }
  obj.minutes = parseInt(obj.seconds / 60, 10)
  obj.hours = parseInt(obj.minutes / 60, 10)

  //do the year
  let tmp = a.clone()
  obj.years = fastYear(tmp, b)
  tmp = a.add(obj.years, 'year')

  //there's always 12 months in a year...
  obj.months = obj.years * 12
  tmp = a.add(obj.months, 'month')
  obj.months += diffOne(tmp, b, 'month')

  // there's always 4 quarters in a year...
  obj.quarters = obj.years * 4
  obj.quarters += parseInt((obj.months % 12) / 3, 10)

  // there's always atleast 52 weeks in a year..
  // (month * 4) isn't as close
  obj.weeks = obj.years * 52
  tmp = a.add(obj.weeks, 'week')
  obj.weeks += diffOne(tmp, b, 'week')

  // there's always atleast 7 days in a week
  obj.days = obj.weeks * 7
  tmp = a.add(obj.days, 'day')
  obj.days += diffOne(tmp, b, 'day')

  return obj
}
export default diff
