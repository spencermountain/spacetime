const spacetime = require('./src/index')

let s = spacetime('6 October 2019', 'australia/sydney').time('4:20am')
s.log()
// s = s.startOf('day')
// s.log()
