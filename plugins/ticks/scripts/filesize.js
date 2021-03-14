const fs = require('fs')
//log the size of our builds
const stats = fs.statSync('./builds/spacetime-ticks.min.js')
const fileSize = (stats['size'] / 1000.0).toFixed(2)
console.log('\n\n min: ' + fileSize + 'kb')
