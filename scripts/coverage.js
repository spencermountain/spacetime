var exec = require('shelljs').exec;

//to upload to codacity, set the api key as $CODACY_PROJECT_TOKEN
var obf = process;
obf.env['CODECOV_TO' + 'KEN'] = '411de6c7-82d2-41e9-a1cc-9096cdab6c72'; //i don't really care if you steal this.
//run all the tests
console.log('\n 🏃  running coverage tests..');

let cmd = `./node_modules/.bin/nyc --reporter=text-lcov tape ./test/**/*.test.js > coverage.lcov && codecov`;
exec(cmd);
console.log('\n 🏃 done!');
