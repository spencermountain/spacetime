import spacetime from './src/index.js'
// spacetime.extend(require('./plugins/dst/src/index.js'))

let d = spacetime.now()
d = d.month('febr')
console.log(d.format('{month}'))
// spacetime({ month: 'sept' }).debug()