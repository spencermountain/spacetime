import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
// import visualizer from 'rollup-plugin-visualizer'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime-ticks.mjs',
        format: 'esm'
      }
    ],
    plugins: [resolve(), json(), commonjs()]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime-ticks.js',
        format: 'umd',
        name: 'spacetime-ticks'
      }
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env']
      })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime-ticks.min.js',
        format: 'umd',
        name: 'spacetime-ticks'
      }
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env']
      }),
      terser()
      // visualizer()
    ]
  }
]
