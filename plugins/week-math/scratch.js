const spacetime = require('../../src')
// the first week of a month includes a thursday, in that month
// (leap days do not effect week-ordering!)
const getFirstWeek = function (s) {
  let month = s.month()
  let start = s.date(1)
  start = start.startOf('week')
  let thu = start.add(3, 'days')
  if (thu.month() !== month) {
    start = start.add(1, 'week')
  }
  return start
}

const plugin = {
  weekOfMonth: function (n) {
    let start = getFirstWeek(this.clone())
    // week-setter
    if (n !== undefined) {
      return start.add(n, 'weeks')
    }
    // week-getter
    let num = 0
    let end = start.endOf('week')
    for (let i = 0; i < 5; i += 1) {
      if (end.isAfter(this)) {
        return num + 1
      }
      end = end.add(1, 'week')
      num += 1
    }
    return num + 1
  },
  whichWeek: function () {
    let s = this.startOf('week')
    // it's always in the same month that it's thursday is...
    let thurs = s.add(3, 'days')
    let month = thurs.monthName()
    let num = thurs.weekOfMonth()

    return { num, month }
  }
}
spacetime.extend(plugin)

const byWeek = function (year) {
  let start = spacetime('jan 1 ' + year)
  let end = start.add(1, 'year').minus(1, 'hour')
  start = getFirstWeek(start)
  let arr = start.minus(1, 'minute').every('week', end)
  let weeks = []
  let last = null
  arr.forEach((s, i) => {
    let res = s.whichWeek()
    if (last && last !== res.month) {
      // weeks.push({ gap: true })
    }
    weeks.push({
      i: i,
      title: `${s.format('{month-short} {date} {year}')}`,
      num: res.num,
      month: res.month,
      year: year
    })
    last = res.month
  })
  if (weeks[weeks.length - 1].month !== 'december') {
    weeks.pop()
  }
  return weeks
}
let arr = byWeek(2021)
// console.log(arr)
// const titleCase = function (str = '') {
//   return str.replace(/\w\S*/g, function (txt) {
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
//   })
// }
// let last = null
// arr.forEach((o) => {
//   if (o.month !== last) {
//     let tmp = spacetime(o.title)
//     let back = tmp.clone().minus(1, 'month')
//     let fwd = tmp.add(1, 'month')
//     // console.log(`[[${titleCase(o.month)} 2021]]`)
//     console.log(`\n\n[[${back.format('{month} {year}')}]] - [[${fwd.format('{month} {year}')}]]\n`)
//     last = o.month
//   }
//   console.log(`[[Week ${o.num}: ${titleCase(o.month)} 2021]]`)
//   let s = spacetime(o.title)
//   for (let i = 0; i < 7; i += 1) {
//     console.log(`\t[[${s.format('{day-short} {month-short} {date-ordinal}')}]]`)
//     s = s.add(1, 'day')
//   }
// })
