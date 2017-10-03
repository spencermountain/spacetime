require('shelljs/global');
var watch = require('watch');
// var tape = './node_modules/tape/bin/tape';
// var tapSpec = './node_modules/tap-spec/bin/cmd.js --color';

var options = {
  interval: 1,
  ignoreDotFiles: true,
  wait: 2,
};

const run = () => {
  exec('tape-watch ./test/**/*.test.js  -p tap-spec --color', {
    stdio: 'inherit',
  });
};

//run tests server-side
watch.watchTree('./', options, function() {
  run();
});
run();
