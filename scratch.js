import spacetime from './src/index.js'
// spacetime.extend(require('./plugins/dst/src/index.js'))


//TODO: make .every() inclusive
let start = spacetime('April 6th 2019', 'Europe/Paris')
let end = spacetime('April 20th 2019', 'Europe/Paris').add(1, 'hour')

start.every('day', end).forEach(s => {
  console.log(s.format('nice-day'))
})

