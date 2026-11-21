/* eslint-disable no-console */
import spacetime from './src/index.ts'

// const input = '2024-07-15T09:00:00+02:00[America/Los_Angeles]'
//
// const t = Temporal.ZonedDateTime.from(input, { offset: 'use' })
// console.log('t:', t.toString({ smallestUnit: 'millisecond' }))
//
// console.log('s:', spacetime(input).format('iso-full'))

// non-recognized offsets
const s = spacetime('2024-01-01T16:20:00+05:17')
console.log('s:', s.format('time'), s.timezone())
