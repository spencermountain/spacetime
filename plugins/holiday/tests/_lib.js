import src from '../src/index.js'
import build from '../builds/spacetime-holiday.mjs'
let lib = src

if (typeof process !== undefined && typeof module !== undefined) {
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==') //eslint-disable-line no-console
    lib = build
  }
}
export default lib
