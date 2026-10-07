// Load only the implementation selected by the test command.
const path = process.env.TESTENV === 'prod' ? '../../builds/spacetime.mjs' : '../../src/index.js'
const { default: spacetime } = await import(path)

export default spacetime
