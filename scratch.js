// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())
console.log(spacetime('Sun Mar 14 15:09:48 +0000 2021').iso())
// console.log(spacetime('Feb 29 2001').isValid())
// console.log(spacetime('Feb 29 2001').isValid())
// console.log(spacetime('Feb 29 2000').isValid(), true)
// console.log(spacetime('Feb 29 2003').isValid(), false)

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
