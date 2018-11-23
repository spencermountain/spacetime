const spacetime = require('./src/index')

const a = spacetime('November 11, 1999 11:11:11', 'Canada/Eastern');
const b = spacetime('December 12, 2000 12:12:12', 'Canada/Eastern');

console.log('start')
console.log(b.since(a))
console.log('end')
