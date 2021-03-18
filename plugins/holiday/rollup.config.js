import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import sizeCheck from 'rollup-plugin-filesize-check'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime-holiday.mjs',
        format: 'esm'
      }
    ],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 13, warn: 10 })],
    external: ['spacetime']
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime-holiday.js',
        format: 'umd',
        name: 'spacetimeHoliday',
        globals: {
          spacetime: 'spacetime'
        }
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

      sizeCheck({ expect: 6, warn: 10 })
    ],
    external: ['spacetime']
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'builds/spacetime-holiday.min.js',
        format: 'umd',
        name: 'spacetimeHoliday',
        globals: {
          spacetime: 'spacetime'
        }
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
      terser(),

      sizeCheck({ expect: 12, warn: 10 })
    ],
    external: ['spacetime']
  }
]
