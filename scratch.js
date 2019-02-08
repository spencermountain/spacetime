const spacetime = require('./src/index')

let str = '2019-01-25T20:00:00+01:00'
let a = spacetime(str)
setTimeout(() => {
  console.log(a.isEqual(str))
})




const from = spacetime('2018-03-29');
const to = from.add(1, 'week');

console.log(from.format('iso'));
console.log(to.format('iso'));

console.log(from.diff(to))

console.log(spacetime('April 12th 2008', 'Canada/Eastern').from('March 12 2018', 'Canada/Eastern'))
console.log(spacetime('April 12th 2008', 'Canada/Eastern').format('iso'));
console.log(spacetime('March 12 2018').format('iso'));
