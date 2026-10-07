// import spacetime from './src/index.js'
import spacetime from 'spacetime/temporal'

// let today = { date: 17, month: 3, year: 1999 }
// let wantDate = { month: 'august', date: '1st', year: '2019' }
// let s = spacetime(wantDate, null, { today: today })
// console.log(s.format('{nice} {year}'));

// const s = spacetime.now('UTC', { silent: false })
// s.add(3, 'daus')
// console.log(s.format('iso-short'), s.isValid())
// Warn: unsupported arithmetic unit "daus"
const s = spacetime('March 1 2012 3:22pm', 'America/New_York')
const tomorrow = s.add(1, 'day')
console.log('Original:', s.format('{month} {date-ordinal}, {time}'))
console.log('Tomorrow:', tomorrow.format('{month} {date-ordinal}, {time}'))
console.log('Los Angeles:', s.goto('America/Los_Angeles').time())
console.log('Native Temporal:', s.toTemporal().toString())

// Calendar days keep the local hour across daylight saving changes.
const beforeDST = spacetime('2024-03-09T12:00:00', 'America/New_York')
const afterDST = beforeDST.add(1, 'day')
console.log('Next calendar day:', afterDST.iso())
console.log('Elapsed hours:', beforeDST.diff(afterDST, 'hours')) // 23
