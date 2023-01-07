import spacetime from './newer/index.js'

// import structure from './newer/changes/build.js'
// import byYear from './newer/changes/by-year.js'
// console.log(byYear('America/Toronto', 2022))

// console.dir(structure, { depth: 5 })
let d = new Date('1999-11-18')
let s = spacetime(d.getTime())
// console.log(s.year())
console.log(s.iso())
// console.log(s.seconds())
