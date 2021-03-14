var exec = require('shelljs').exec;
var echo = require('shelljs').echo;
var fs = require('fs');
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/.bin/derequire';
var terser = './node_modules/.bin/terser';

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

//final build locations
var banner = '/* somehow v' + pkg.version + '\n   github.com/spencermountain/spacetime-ticks\n   MIT\n*/\n';
var uncompressed = './builds/spacetime-ticks.js';
var compressed = './builds/spacetime-ticks.min.js';

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
echo(banner).to(uncompressed);
echo(banner).to(compressed);

//browserify + derequire
var cmd = browserify + ' ./src/index.js --standalone spacetimeTicks';
cmd += ' -t [ babelify --presets [ @babel/preset-env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + uncompressed;
exec(cmd);

//uglify
cmd = terser + ' ' + uncompressed + ' --mangle --compress ';
cmd += ' >> ' + compressed;
exec(cmd);

//log the size of our builds
let stats = fs.statSync(compressed);
let fileSize = (stats['size'] / 1000.0).toFixed(2);
console.log('\n\n min: ' + fileSize + 'kb');
