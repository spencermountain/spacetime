import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'
import { version } from './package.json'

console.log('\n 📦  - running rollup..\n')

const banner = '/* spencermountain/spacetime-daylight ' + version + ' MIT */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-daylight.mjs', format: 'esm' }],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      sizeCheck({ expect: 132, warn: 10 })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner: banner,
        file: 'builds/spacetime-daylight.js',
        format: 'umd',
        sourcemap: false,
        name: 'spacetimeDaylight'
      }
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      sizeCheck({ expect: 134, warn: 10 })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner: banner,
        file: 'builds/spacetime-daylight.min.js',
        format: 'umd',
        name: 'spacetimeDaylight'
      }
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      terser(),
      sizeCheck({ expect: 95, warn: 10 })
    ]
  }
]
