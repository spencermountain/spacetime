import { addUnits } from './src/index.js'
import { parseDuration, parseDateTime } from './src/lib/parse.js'
import { formatDate } from './src/lib/format.js'
import { applyDurationToJsDate, compareWithJsDate } from './tests/_lib.js'

let a
a = ['2025-04-29T00:00:00', 'P1D']
// a = ['2024-03-15T23:45:00', 'PT2H30M']
// a = ['2024-02-28T00:00:00', 'P1D']
// a = ['2023-02-28T00:00:00', 'P1D']
// a = ['2024-12-31T23:59:59', 'PT1S']
// a = ['2024-01-31T00:00:00', 'P6M']
// a = ['2024-01-31T00:00:00', 'P14M']

// Our implementation
const state = parseDateTime(a[0])
const changes = parseDuration(a[1])
const result = addUnits(state, changes)

console.log(result)
console.log(formatDate(result))
// Compare with JS Date
// const jsDate = applyDurationToJsDate(
//   new Date(dateStr),
//   parseDuration(durationStr)
// )

// // console.log('\nTest:', dateStr, '+', durationStr)
// console.log(formatDate(result))
// console.log(formatDate(jsDate))

// // Compare results
// const matches = compareWithJsDate(result, jsDate)
// console.log('Match?', matches ? '✅' : '❌')
