import spacetime from './src/index.js'

// let today = { date: 17, month: 3, year: 1999 }
// let wantDate = { month: 'august', date: '1st', year: '2019' }
// let s = spacetime(wantDate, null, { today: today })
// console.log(s.format('{nice} {year}'));

const s = spacetime.now('UTC', { silent: false })
s.add(3, 'daus')
console.log(s.format('iso-short'), s.isValid())
// Warn: unsupported arithmetic unit "daus"
