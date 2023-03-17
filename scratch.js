import spacetime from './src/01-one/index.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'


// spacetime.world.methods.now = () => 1554092400000

// console.log(spacetime({ year: 1983 }).iso())

// spacetime.world.model.days[1].longForm = 'Lundi'
// console.log(spacetime.world.model.days)
// console.log(spacetime.now().day(1).format('day'))

// console.log(spacetime([1999, 12, 31]).dayName())

let s = spacetime(null, '+05:30')
// s = s.add(22, 'minute').minus(44, 'minute').add(22, 'minute')
// console.log(s.iso())


// let s = spacetime('2021-01-01T00:00:00.000+02:30')
// s = s.add(22, 'minute').minus(44, 'minute').add(22, 'minute')
// console.log(s.iso())

// let s = spacetime.now()
// console.log(s.hour())
// console.log(s.format('{iso}'))
// one.forEach(k => {
//   console.log(k)
//   s[k]()
// })
// s = s.time('3:21:33pm')
// s.debug()
// console.log(s.date(12))