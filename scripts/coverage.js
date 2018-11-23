var exec = require('shelljs').exec;
var nyc = './node_modules/nyc/bin/nyc.js';
var codacity = './node_modules/.bin/codacy-coverage';
var tape = './node_modules/tape/bin/tape';
// var tapSpec = './node_modules/tap-spec/bin/cmd.js';
var test = tape + ' "./test/*.test.js" ';

//to upload to codacity, set the api key as $CODACY_PROJECT_TOKEN
//export CODACY_PROJECT_TOKEN=<myToken>

//run all the tests
console.log('\n 🏃  running coverage tests..');
exec(nyc + ' --reporter=text-lcov ' + test + ' > coverage.lcov');
// exec(nyc + ' --reporter=html ' + test + ' | ' + tapSpec);

//publish results for codacy
console.log('\n\n\nPublishing results to codacy...\n');
var cmd = nyc + ' report --reporter=text-lcov ' + test + ' | ' + codacity;
exec(cmd);
console.log('\n 🏃 done!');
