import spacetime from './src/index.js'

// let today = { date: 17, month: 3, year: 1999 }
// let wantDate = { month: 'august', date: '1st', year: '2019' }
// let s = spacetime(wantDate, null, { today: today })
// console.log(s.format('{nice} {year}'));

let str = 'Mon Jun 17 2019 11:00:00 GMT+0530 (India Standard Time)'
let s = spacetime(str)
console.log(s.format('iso'))
  // '2019-06-17T11:00:00+05:30'
