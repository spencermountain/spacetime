import src from '../../src/index.js'
import build from '../../builds/spacetime.mjs'
let lib = src
//export dev, or compiled lib
if (typeof process !== undefined && typeof module !== undefined) {
  if (process.env.TESTENV === 'prod') {
    console.log('== production build test 🚀 ==');
    lib = build
  }
}

export default lib