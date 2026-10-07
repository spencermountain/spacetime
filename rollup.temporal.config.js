import guard from './scripts/_lib/temporal-build-guard.js'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/temporal/index.js',
  plugins: [guard()],
  output: [
    { file: 'builds/spacetime-temporal.mjs', format: 'esm', plugins: [terser()] },
    { file: 'builds/spacetime-temporal.cjs', format: 'cjs', plugins: [terser()] }
  ]
}
