const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

// let s = spacetime('jan 1 2021')
// let wks = s.weeksOfMonth()
// wks.forEach((wk) => {
//   console.log('   ' + wk.format('nice'))
// })

// const byWeek = function (year) {
//   let arr = spacetime('jan 1 ' + year)
//     .minus(1, 'hour')
//     .every('week', 'Jan 1st 2022')
//   return arr.map((s) => {
//     let res = s.whichWeek()
//     return { title: s.format('nice-day'), num: res.num, month: res.month }
//   })
// }
// console.log(byWeek(2020))

// const padEnd = function (str, width) {
//   str = str.toString()
//   while (str.length < width) {
//     str += ' '
//   }
//   return str
// }

// let arr = spacetime('jan 1 2021').minus(1, 'hour').every('month', 'Jan 1st 2022')
// arr.forEach((s) => {
//   console.log('[[' + s.format('{month} {year}') + ']]')
//   let wks = s.weeksOfMonth()
//   let month = s.format('month')
//   wks.forEach((wk, i) => {
//     // console.log('   [[' + wk.format('nice-day') + ']]')
//     let sun = wk.endOf('week')
//     let name = `[[Week ${i + 1}: ${month} ${wk.format('{year}')}]]`
//     name = padEnd(name, 25)
//     console.log(`\t${name}  - ${wk.format('{date-ordinal}')}-${sun.format('date-ordinal')}`)
//   })
// })

// let d = spacetime('2020-11-01T01:32:00.000-06:00')
// console.log(d.time()) // 1:32am
// d = d.add(30, 'minutes')
// console.log(d.time() === '2:02am') // 1:02am

// let d = spacetime('december 1 2020').add(1, 'season')
// let d = spacetime().endOf('season')
// let d = spacetime().next('season')
// console.log(d.format('nice'))

// let s = spacetime().time('4:30pm')
// s = s.goto('Europe/Paris')
// console.log(s.time())
// s = s.goto('America/Toronto')
// console.log(s.timezone())
// s = s.goto(null)
// console.log(s.timezone())
// console.log(s.time())
// console.log(new Date().getTimezoneOffset() / 60)

console.log(spacetime().time('4:30pm').goto('Europe/Paris').goto(null).time())
