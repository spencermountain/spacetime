const spacetime = require('./src/index')

let str = '2019-01-25T20:00:00+05:30'
let a = spacetime(str, 'Canada/Eastern');
console.log('iso: ', a.format('iso'))
console.log('timezone: ', a.timezone().name)


str = '2019-01-25T01:00:00+0530'
a = spacetime(str, 'Canada/Eastern');
console.log('iso: ', a.format('iso'))
console.log('timezone: ', a.timezone().name)
