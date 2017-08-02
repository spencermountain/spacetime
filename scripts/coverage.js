require('shelljs/global');
var nyc = './node_modules/nyc/bin/nyc.js';
var tape = './node_modules/tape/bin/tape';
//run tests server-side
// exec(nyc + ' ' + tape + ' \'./test/unit/**/*.test.js\'');
exec(nyc + ' --reporter=html ' + tape + " './test/**/*.test.js'");
// exec(nyc + ' --reporter=text-summary ' + tape + ' \'./test/unit/**/*.test.js\'');
