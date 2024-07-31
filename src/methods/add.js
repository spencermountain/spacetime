import walkTo from './set/walk.js'
import ms from '../data/milliseconds.js'
import monthLength from '../data/monthLengths.js'
import { months, daysBack, days } from './set/_model.js'
import { normalize } from '../fns.js'
// this logic is a bit of a mess,
// but briefly:
// millisecond-math, and some post-processing covers most-things
// we 'model' the calendar here only a little bit
// and that usually works-out...

const order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month']
let keep = {
  second: order.slice(0, 1),
  minute: order.slice(0, 2),
  quarterhour: order.slice(0, 2),
  hour: order.slice(0, 3),
  date: order.slice(0, 4),
  month: order.slice(0, 4),
  quarter: order.slice(0, 4),
  season: order.slice(0, 4),
  year: order,
  decade: order,
  century: order
}
keep.week = keep.hour
keep.season = keep.date
keep.quarter = keep.date

// Units need to be dst adjuested
const dstAwareUnits = {
  year: true,
  quarter: true,
  season: true,
  month: true,
  week: true,
  date: true
}

const keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
}

const addMethods = (SpaceTime) => {
  SpaceTime.prototype.add = function (num, unit) {
    let s = this.clone()

    if (!unit || num === 0) {
      return s //don't bother
    }
    let old = this.clone()
    unit = normalize(unit)
    if (unit === 'millisecond') {
      s.epoch += num
      return s
    }
    // support 'fortnight' alias
    if (unit === 'fortnight') {
      num *= 2
      unit = 'week'
    }
    //move forward by the estimated milliseconds (rough)
    if (ms[unit]) {
      s.epoch += ms[unit] * num
    } else if (unit === 'week' || unit === 'weekend') {
      s.epoch += ms.day * (num * 7)
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += ms.month * (num * 3)
    } else if (unit === 'quarterhour') {
      s.epoch += ms.minute * 15 * num
    }
    //now ensure our milliseconds/etc are in-line
    let want = {}
    if (keep[unit]) {
      keep[unit].forEach((u) => {
        want[u] = old[u]()
      })
    }

    if (dstAwareUnits[unit]) {
      const diff = old.timezone().current.offset - s.timezone().current.offset
      s.epoch += diff * 3600 * 1000
    }

    //ensure month/year has ticked-over
    if (unit === 'month') {
      want.month = old.month() + num
      //month is the one unit we 'model' directly
      want = months(want, old)
    }
    //support coercing a week, too
    if (unit === 'week') {
      let sum = old.date() + (num * 7)
      if (sum <= 28 && sum > 1) {
        want.date = sum
      }
    }
    if (unit === 'weekend' && s.dayName() !== 'saturday') {
      s = s.day('saturday', true) //ensure it's saturday
    }
    //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
      if (num < 0) {
        want = daysBack(want, old, num)
      } else {
        //specify a naive date number, if it's easy to do...
        let sum = old.date() + num
        // ok, model this one too
        want = days(want, old, sum)
      }
      //manually punt it if we haven't moved at all..
      if (num !== 0 && old.isSame(s, 'day')) {
        want.date = old.date() + num
      }
    }
    // ensure a quarter is 3 months over
    else if (unit === 'quarter') {
      want.month = old.month() + (num * 3)
      want.year = old.year()
      // handle rollover
      if (want.month < 0) {
        let years = Math.floor(want.month / 12)
        let remainder = want.month + (Math.abs(years) * 12)
        want.month = remainder
        want.year += years
      } else if (want.month >= 12) {
        let years = Math.floor(want.month / 12)
        want.month = want.month % 12
        want.year += years
      }
      want.date = old.date()
    }
    //ensure year has changed (leap-years)
    else if (unit === 'year') {
      let wantYear = old.year() + num
      let haveYear = s.year()
      if (haveYear < wantYear) {
        let toAdd = Math.floor(num / 4) || 1 //approx num of leap-days
        s.epoch += Math.abs(ms.day * toAdd)
      } else if (haveYear > wantYear) {
        let toAdd = Math.floor(num / 4) || 1 //approx num of leap-days
        s.epoch += ms.day * toAdd
      }
    }
    //these are easier
    else if (unit === 'decade') {
      want.year = s.year() + 10
    } else if (unit === 'century') {
      want.year = s.year() + 100
    }
    //keep current date, unless the month doesn't have it.
    if (keepDate[unit]) {
      let max = monthLength[want.month]
      want.date = old.date()
      if (want.date > max) {
        want.date = max
      }
    }
    if (Object.keys(want).length > 1) {
      walkTo(s, want)
    }
    return s
  }

  //subtract is only add *-1
  SpaceTime.prototype.subtract = function (num, unit) {
    let s = this.clone()
    return s.add(num * -1, unit)
  }
  //add aliases
  SpaceTime.prototype.minus = SpaceTime.prototype.subtract
  SpaceTime.prototype.plus = SpaceTime.prototype.add
}

export default addMethods
