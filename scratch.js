import spacetime from './src/index.js'
// spacetime.extend(require('./plugins/dst/src/index.js'))




let s = spacetime('1994-11-05', 'asia/beirut')
console.log(s.timezone())
// 1994-11-05T08:15:30.230-05:00

