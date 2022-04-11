import spacetime from './src/index.js'
// spacetime.extend(require('./plugins/dst/src/index.js'))

let d = spacetime.now()

let obj = { month: 3, date: 8, year: 2022 }

// obj = { month: 9, date: 22, year: 2022 }
let time = `6:40 PM`
let date = spacetime(obj).time('1:35 PM').iso()
// d = d.time('1:35 PM')
// d = d.month('febr')
// console.log(d.format('{month}'))
// spacetime({ month: 'sept' }).debug()
console.log(date)