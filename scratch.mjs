import spacetime from './src/index'

let s = spacetime('March 2')
console.log(s.format('dd'))
console.log(s.unixFmt('dd-MMM'))
