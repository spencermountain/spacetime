/* eslint-disable no-console */
import spacetime from './src/index.ts'

// const input = '2024-07-15T09:00:00+02:00[America/Los_Angeles]'
//
// const t = Temporal.ZonedDateTime.from(input, { offset: 'use' })
// console.log('t:', t.toString({ smallestUnit: 'millisecond' }))
//
// console.log('s:', spacetime(input).format('iso-full'))

// let s = spacetime('2024-01-01T16:20:00').goto('Asia/Tokyo')
let s = spacetime.now('America/Los_Angeles').time('16:20:00')
console.log(s.time())

// s = spacetime.now('America/Los_Angeles').set('2024-01-01T16:20:00')
// console.log(s.time())
