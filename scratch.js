// import spacetime from './src/index.js'
import spacetime from 'spacetime/temporal'

// let today = { date: 17, month: 3, year: 1999 }
// let wantDate = { month: 'august', date: '1st', year: '2019' }
// let s = spacetime(wantDate, null, { today: today })
// console.log(s.format('{nice} {year}'));
//
// const s = spacetime('june 8th 2021', 'America/Los_Angeles').time('16:22')
// const dt = s.toTemporal() //Temporal.ZonedDateTime
//
// // get current time
// let str = `${dt.hour}:${String(dt.minute).padStart(2, "0")}`
// // 16:22
// let tz = dt.timeZoneId
// // "America/Los_Angeles"
//
// console.log(str, tz)

let s = spacetime(`oct 9 '27`,'America/New_York')
s = s.startOf('week').add(1, 'week')
s.format('{month-short} {date-ordinal}') // Oct 11th

// Warn: unsupported arithmetic unit "daus"
// const s = spacetime('March 1 2012 3:22pm', 'America/New_York')
// const tomorrow = s.add(1, 'day')
// console.log('Original:', s.format('{month} {date-ordinal}, {time}'))
// console.log('Tomorrow:', tomorrow.format('{month} {date-ordinal}, {time}'))
// console.log('Los Angeles:', s.goto('America/Los_Angeles').time())
// console.log('Native Temporal:', s.toTemporal().toString())
//
// // Calendar days keep the local hour across daylight saving changes.
// const beforeDST = spacetime('2024-03-09T12:00:00', 'America/New_York')
// const afterDST = beforeDST.add(1, 'day')
// console.log('Next calendar day:', afterDST.iso())
// console.log('Elapsed hours:', beforeDST.diff(afterDST, 'hours')) // 23
