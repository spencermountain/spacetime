import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'
import fs from 'fs'

let pkg = JSON.parse(fs.readFileSync('./package.json').toString())
let version = pkg.version
console.log('\n 📦  - running rollup..\n')

const banner = '/* spencermountain/spacetime ' + version + ' Apache 2.0 */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime.mjs', format: 'esm' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 48, warn: 10 })]
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner: banner,
        file: 'builds/spacetime.cjs',
        format: 'umd',
        sourcemap: false,
        name: 'spacetime'
      }
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      sizeCheck({ expect: 110, warn: 10 })
    ]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime.min.js', format: 'umd', name: 'spacetime' }],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      terser(),
      sizeCheck({ expect: 48, warn: 10 })
    ]
  }
]
