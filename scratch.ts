import spacetime from './src/index.ts'
// import spacetime from 'spacetime/temporal'

const s = spacetime('2023-03-12T01:39:00-08:00')

console.log(s.timezone())
