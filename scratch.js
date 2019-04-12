const spacetime = require('./src/index')

// d = d.minute(90)
// d = d.second(90)
// d = d.millisecond(90)
// d = d.dayOfYear(369)

let d = spacetime([2019, 'march', 31, 3, 3], 'Europe/Stockholm')
console.log(d.format('{month} {date} {time}'))
// Mar 30th, 12:00am
