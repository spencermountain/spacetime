import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'src/index.js',
    output: [{ file: 'builds/spacetime-ticks.mjs', format: 'esm' }],
    plugins: [resolve(), json(), commonjs()]
  },
  {
    input: 'src/index.js',
    output: [{ file: 'builds/spacetime-ticks.cjs', format: 'umd', name: 'spacetime-ticks' }],
    plugins: [resolve(), json(), commonjs()]
  },
  {
    input: 'src/index.js',
    output: [{ file: 'builds/spacetime-ticks.min.js', format: 'umd', name: 'spacetime-ticks' }],
    plugins: [resolve(), json(), commonjs(), terser()]
  }
]
