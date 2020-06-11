const monthLength = require('../../data/monthLengths')
const isLeapYear = require('../../fns').isLeapYear

const getMonthLength = function (month, year) {
  if (month === 1 && isLeapYear(year)) {
    return 29
  }
  return monthLength[month]
}

//month is the one thing we 'model/compute'
//- because ms-shifting can be off by enough
const rollMonth = (want, old) => {
  //increment year
  if (want.month > 0) {
    let years = parseInt(want.month / 12, 10)
    want.year = old.year() + years
    want.month = want.month % 12
  } else if (want.month < 0) {
    //decrement year
    let years = Math.floor(Math.abs(want.month) / 13, 10)
    years = Math.abs(years) + 1
    want.year = old.year() - years
    //ignore extras
    want.month = want.month % 12
    want.month = want.month + 12
    if (want.month === 12) {
      want.month = 0
    }
  }
  return want
}

// briefly support day=-2 (this does not need to be perfect.)
const rollDaysDown = (want, old, sum) => {
  want.year = old.year()
  want.month = old.month()
  let date = old.date()
  want.date = date - Math.abs(sum)
  while (want.date < 1) {
    want.month -= 1
    if (want.month < 0) {
      want.month = 11
      want.year -= 1
    }
    let max = getMonthLength(want.month, want.year)
    want.date += max
  }
  return want
}

// briefly support day=33 (this does not need to be perfect.)
const rollDaysUp = (want, old, sum) => {
  let year = old.year()
  let month = old.month()
  let max = getMonthLength(month, year)
  while (sum > max) {
    sum -= max
    month += 1
    if (month >= 12) {
      month -= 12
      year += 1
    }
    max = getMonthLength(month, year)
  }
  want.month = month
  want.date = sum
  return want
}

module.exports = {
  months: rollMonth,
  days: rollDaysUp,
  daysBack: rollDaysDown
}
