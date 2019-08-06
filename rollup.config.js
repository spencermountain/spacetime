import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime.mjs',
        format: 'esm'
      }
    ],
    plugins: [resolve(), json(), commonjs()]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime.js',
        format: 'umd',
        sourcemap: true,
        name: 'spacetime'
      }
    ],
    plugins: [resolve(), json(), commonjs()]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime.min.js',
        format: 'umd',
        name: 'spacetime'
      }
    ],
    plugins: [resolve(), json(), commonjs(), terser()]
  }
]
