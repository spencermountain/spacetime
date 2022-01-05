import spacetime from './src/index.js'
// spacetime.extend(require('./plugins/dst/src/index.js'))



const s = spacetime('sep 1 2000')
console.log(s.unixFmt('yy'))
// const a = s.subtract(25, 'month');
