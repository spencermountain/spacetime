require('shelljs/global');
config.silent = true;
var fs = require('fs');
var path = require('path');
//use paths, so libs don't need a -g
var browserify = path.join('node_modules', '.bin', 'browserify');
var derequire = path.join('node_modules', '.bin', 'derequire');
var uglify = path.join('node_modules', '.bin', 'uglifyjs');
var eslint = path.join('node_modules', '.bin', 'eslint');

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

//first, run linter
var child = exec(eslint + ' -c .eslintrc --color ./src/**', {
  async: true,
});
child.stdout.on('error', function() {
  //(exit if linter finds errors)
  process.exit();
});

//final build locations
var banner = '/* spacetime v' + pkg.version + '\n  \n*/\n';
var uncompressed = './builds/spacetime.js';
var compressed = './spacetime.js';
var immutable = './immutable.js'
var immutableTmp = './immutable.tmp.js'

//cleanup. remove old builds
exec('rm -rf ./builds && rm immutable.js && mkdir builds');

//add a header, before our sourcecode
echo(banner).to(uncompressed);
echo(banner).to(compressed);

//browserify + derequire
var cmd = browserify + ' ./src/index.js --standalone spacetime';
cmd += ' -t [ babelify --presets [ env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + uncompressed;
exec(cmd);

//add immutable build
cmd = browserify + ' ./src/immutable.js --standalone spacetime';
cmd += ' -t [ babelify --presets [ env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + immutableTmp;
exec(cmd);

//uglify
cmd = uglify + ' ' + uncompressed + ' --mangle --compress ';
cmd += ' >> ' + compressed;
exec(cmd); // --source-map ' + compressed + '.map'

cmd = uglify + ' ' + immutableTmp + ' --mangle --compress ';
cmd += ' >> ' + immutable;
exec(cmd); // --source-map ' + compressed + '.map'

exec('rm -rf ./builds && rm immutable.tmp.js')

//print filesizes
var stats = fs.statSync(compressed);
var fileSize = (stats['size'] / 1000.0).toFixed(2);
console.log('\n\n es5: - - ' + fileSize + 'kb');
