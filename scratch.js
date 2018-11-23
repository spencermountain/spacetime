const spacetime = require('./src/index')

var s = spacetime('January 5th 2018');
s.add(2, 'months')
console.log(s.format('nice'));
