// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())
// console.log(spacetime('2001-02-02T12Z').tz)
// console.log(spacetime('', 'Africa/Cairo').timezone())

console.log(spacetime('1970-01-01', 'gmt').isEqual('1970-01-01'))
// console.log(spacetime('1970-01-02', 'gmt').isEqual('1970-01-02'))
// console.log(spacetime('1970-01-02', 'gmt').isEqual('1970-01-01'))
// console.log(spacetime('1970-01-01', 'gmt').isEqual('1970-01-02'))

// let s = spacetime(null, 'pacific/fiji')
// console.log(s.time())
// console.log(s.timezone())
// s = s.minus(5, 'months')
// console.log(s.time())
// console.log(s.timezone())

// s = spacetime(null, 'America/Toronto')
// console.log(s.time())
// console.log(s.timezone())

/*
bahia_banderas
chihuahua
mazatlan
merida
mexico_city
monterrey
amman
damascus
tehran
fiji
*/
