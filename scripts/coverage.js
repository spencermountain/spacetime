const exec = require('shelljs').exec
const codecov = '411de6c7-82d2-41e9-a1cc-9096cdab6c72' //i don't really care if you steal this.

//let cmd=`./node_modules/.bin/nyc --reporter=text ./node_modules/.bin/tape ./test/**/*.test.js`
//run all the tests
const cmd = `./node_modules/.bin/nyc --reporter=text-lcov ./node_modules/.bin/tape ./test/**/*.test.js > coverage.lcov && ./node_modules/.bin/codecov -t ${codecov}`
exec(cmd)
console.log('\n 🏃 done!')
