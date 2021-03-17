const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/age/src/index.js'))

let s = spacetime.now('america/indiana/marengo')
console.log(s.time())
console.log(s.timezone())
