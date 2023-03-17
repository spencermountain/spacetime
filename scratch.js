import spacetime from './src/01-one/index.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'


// spacetime.world.methods.now = () => 1554092400000


// main
const one = [
  'clone',
  'format',
  'isValid',
  'log',
  // move
  'set',
  'startOf',
  'endOf',
  'add',
  'subtract',
  'next',
  'last',
  'nearest',
  'every',
  // compare
  'isAfter',
  'isBefore',
  'isEqual',
  'isSame',
  'diff',
  // getters
  'millisecond',
  'second',
  'minute',
  'hour',
  'date',
  'month',
  'year',

  'dayOfYear',
  'time',
  'week',
  'quarter',
  // 'season',
  'hourFloat',
  'day',
  'ampm',
  // 'dayTime',

  'monthName',
  'progress',
  'leapYear',
  'inDST',
  'hasDST',
  'offset',
  'weekStart',
  'daysInMonth',
]
// spacetime.world.methods.now = ()=> 0
// spacetime.now().iso('short') // 1970-01-01

// console.log(spacetime({ year: 1983 }).iso())
// spacetime.world.zones['Foo/Bar'] = { offset: 2 }

// spacetime.world.model.days[1].longForm = 'Lundi'
// console.log(spacetime.world.model.days)
let s = spacetime.now()
console.log(s.hour())
// spacetime.plugin({ model:{} })
// let s = spacetime.day('wednesday')
s.debug()
// one.forEach(k => {
//   console.log(k)
//   s[k]()
// })
// s = s.time('3:21:33pm')
// s.debug()
// console.log(s.date(12))