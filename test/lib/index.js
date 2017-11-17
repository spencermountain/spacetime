//export dev, or compiled lib
if (typeof process !== undefined && typeof module !== undefined) {
  if (process.env.TESTENV === 'prod') {
    console.log('== production build test 🚀 ==');
    module.exports = require('../../');
  } else {
    module.exports = require('../../src');
  }
}
