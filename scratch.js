import spacetime from './src/index.js'
// spacetime.extend(require('./plugins/dst/src/index.js'))



const s = spacetime('jan 1 2022')
// const a = s.subtract(25, 'month');

let a = s.subtract(12, 'month');
console.log(a.format('iso-short'), '  -> 2021-01-01')

// a = s.subtract(12, 'month');
// console.log(a.format('iso-short'), '  -> 2021')

// a = s.subtract(24, 'month');
// console.log(a.format('iso-short'), '  -> 2020')


// const b = s.subtract(13, 'month');
// console.log(a.format('iso-short'), ' - ', b.format('iso-short'));