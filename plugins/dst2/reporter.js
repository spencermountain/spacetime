import { Transform } from 'stream';
const green = str => '\x1b[32m' + str + '\x1b[0m'
// const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'

const symbols = {
  pass: green('.'),
  fail: '❌',//red('x'),
  skip: blue('-'),
  todo: 'T',
}

class CustomDotReporter extends Transform {
  constructor() {
    super({ objectMode: true });
    this.passed = 0;
    this.failed = 0;
    this.failedTests = [];
    this.startTime = Date.now();
  }

  _transform(event, _encoding, callback) {
    // console.log(event)
    // Handle console logs from tests
    if (event.type === 'test:stdout') {
      process.stdout.write(`\n${dim(event.data.message)}\n`);
    }

    // Handle test completion
    else if (event.type === 'test:pass') {
      process.stdout.write(symbols.pass);
      this.passed++;
    }
    else if (event.type === 'test:fail') {
      process.stdout.write(symbols.fail);
      this.failed++;
      this.failedTests.push({
        name: event.data.name,
        error: event.data.details?.error,
      });
    }
    else if (event.type === 'test:summary') {
      // console.log(event.data)
    }
    callback();
  }

  _flush(callback) {
    const duration = (Date.now() - this.startTime) / 1000;

    // Add newline after dots
    process.stdout.write('\n\n');

    // Print summary
    console.log(dim(`Tests: ${this.passed + this.failed} | ${this.failed} failed`));
    console.log(dim(`${duration.toFixed(2)}s`));

    // Print failed test details
    // if (this.failedTests.length > 0) {
    //   console.log('\nFailed Tests:');
    //   this.failedTests.forEach((test, i) => {
    //     console.log(`\n${i + 1}) ${test.parent ? `${test.parent} > ` : ''}${test.name}`);
    //     if (test.error) {
    //       console.log(`   Error: ${test.error.message}`);
    //       if (test.error.stack) {
    //         console.log(`   ${test.error.stack.split('\n').slice(1).join('\n   ')}`);
    //       }
    //     }
    //   });
    // }

    callback();
  }
}

export default CustomDotReporter;