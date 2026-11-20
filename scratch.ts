import spacetime from './src/index.ts'
// import spacetime from 'spacetime/temporal'

const one = spacetime('2023-03-12T01:39:00-08:00').goto('America/Los_Angeles').time()
console.log(one)
// '2:39am'  (expected '1:39am'; the original report got '3:39am')
const two = spacetime('2023-03-12T01:39:00-08:00', 'America/Los_Angeles').time()
console.log(two)
