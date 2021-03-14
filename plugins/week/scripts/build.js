const sh = require('shelljs')
const echo = sh.echo
const exec = sh.exec
sh.config.silent = true
const fs = require('fs')
const pkg = require('../package.json')
const browserify = './node_modules/.bin/browserify'
const derequire = './node_modules/.bin/derequire'
const terser = './node_modules/.bin/terser'

//final build locations
const banner =
  '/* spacetime-week v' +
  pkg.version +
  '\n   github.com/spencermountain/spacetime-week\n   MIT\n*/\n'
const uncompressed = './builds/spacetime-week.js'
const compressed = './builds/spacetime-week.min.js'

//set new version number
fs.writeFileSync('./_version.js', `module.exports = '${pkg.version}'`)

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds')

//add a header, before our sourcecode
echo(banner).to(uncompressed)
echo(banner).to(compressed)

//browserify + derequire
let cmd = browserify + ' ./src/index.js --standalone spacetimeWeek'
cmd += ' -t [ babelify --presets [ @babel/preset-env ] ]'
cmd += ' | ' + derequire
cmd += ' >> ' + uncompressed
exec(cmd)

//uglify
cmd = terser + ' ' + uncompressed + ' --mangle --compress '
cmd += ' >> ' + compressed
exec(cmd)

//log the size of our builds
const stats = fs.statSync(compressed)
const fileSize = (stats['size'] / 1000.0).toFixed(2)
console.log('\n\n min: ' + fileSize + 'kb')
