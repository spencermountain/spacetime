import diffOne from './one.ts'
import type { Spacetime } from '../../types/index.ts'

// don't do anything too fancy here.
// 2020 - 2019 may be 1 year, or 0 years
// - '1 year difference' means 366 days during a leap year
const fastYear = (a: Spacetime, b: Spacetime): number => {
  let years = b.year() - a.year()
  // should we decrement it by 1?
  // verify with add(), so we land on the same side of a dst-fold as the month/day walks do
  if (a.add(years, 'year').isAfter(b)) {
    years -= 1
  }
  return years
}

// use a waterfall-method for computing a diff of any 'pre-knowable' units
// compute years, then compute months, etc..
// ... then ms-math for any very-small units
const diff = function (a: Spacetime, b: Spacetime): Record<string, number> {
  // an hour is always the same # of milliseconds
  // so these units can be 'pre-calculated'
  const msDiff = b.epoch - a.epoch
  const obj: Record<string, number> = {
    milliseconds: msDiff,
    seconds: Math.trunc(msDiff / 1000)
  }
  obj.minutes = Math.trunc(obj.seconds / 60)
  obj.hours = Math.trunc(obj.minutes / 60)

  //do the year
  obj.years = fastYear(a, b)

  //there's always 12 months in a year...
  // (keep walking from the original date - feb 29 plus two years is clamped to feb 28,
  // and counting on from the 28th would find a month that isn't there)
  obj.months = diffOne(a, b, 'month', obj.years * 12)
  // a dst-fold can knock the year-estimate off-by-one - keep years consistent with the month-walk
  obj.years = Math.trunc(obj.months / 12)

  // there's always 4 quarters in a year...
  obj.quarters = obj.years * 4
  obj.quarters += Math.trunc((obj.months % 12) / 3)

  // there's always atleast 52 weeks in a year..
  // (month * 4) isn't as close
  obj.weeks = diffOne(a, b, 'week', obj.years * 52)

  // there's always atleast 7 days in a week
  obj.days = diffOne(a, b, 'day', obj.weeks * 7)

  return obj
}
export default diff
