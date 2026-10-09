import terser from '@rollup/plugin-terser'

export default {
  input: 'src/temporal/index.js',
  output: [
    { file: 'builds/spacetime-temporal.mjs', format: 'esm', plugins: [terser()] },
    { file: 'builds/spacetime-temporal.cjs', format: 'cjs', plugins: [terser()] }
  ]
}
