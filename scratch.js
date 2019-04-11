const spacetime = require('./src/index')

console.log(
  spacetime(1489520157124)
    .goto('Europe/Berlin')
    .format('iso')
)
// 2019-04-04T08:00:00.000+02:00
