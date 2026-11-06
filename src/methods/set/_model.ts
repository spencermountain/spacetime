import monthLength from '../../data/monthLengths.ts'
import { isLeapYear } from '../../fns.ts'
import type { Spacetime, DateParts } from '../../types/index.ts'

export const getMonthLength = function (month: number, year: number): number {
  if (month === 1 && isLeapYear(year)) {
    return 29
  }
  return monthLength[month]
}

//month is the one thing we 'model/compute'
//- because ms-shifting can be off by enough
const rollMonth = (want: DateParts, old: Spacetime): DateParts => {
  //increment year
  if (want.month > 0) {
    const years = Math.trunc(want.month / 12)
    want.year = old.year() + years
    want.month = want.month % 12
  } else if (want.month < 0) {
    const m = Math.abs(want.month)
    let years = Math.trunc(m / 12)
    if (m % 12 !== 0) {
      years += 1
    }
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
const rollDaysDown = (want: DateParts, old: Spacetime, sum: number): DateParts => {
  want.year = old.year()
  want.month = old.month()
  const date = old.date()
  want.date = date - Math.abs(sum)
  while (want.date < 1) {
    want.month -= 1
    if (want.month < 0) {
      want.month = 11
      want.year -= 1
    }
    const max = getMonthLength(want.month, want.year)
    want.date += max
  }
  return want
}

// briefly support day=33 (this does not need to be perfect.)
const rollDaysUp = (want: DateParts, old: Spacetime, sum: number): DateParts => {
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

export const months = rollMonth
export const days = rollDaysUp
export const daysBack = rollDaysDown
