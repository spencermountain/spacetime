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
    input: './src/01-one/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-one.mjs', format: 'esm' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 56, warn: 10 })]
  },
  {
    input: './src/01-one/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-one.min.js', format: 'umd', sourcemap: false, name: 'spacetime' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 56, warn: 10 })]
  },
  {
    input: './src/02-two/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-two.mjs', format: 'esm' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 56, warn: 10 })]
  },
  {
    input: './src/02-two/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-two.min.js', format: 'umd', sourcemap: false, name: 'spacetime' }],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 56, warn: 10 })]
  },
  {
    input: './src/03-three/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-three.mjs', format: 'esm' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 71, warn: 10 })]
  },
  {
    input: './src/03-three/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-three.min.js', format: 'umd', sourcemap: false, name: 'spacetime' }],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 71, warn: 10 })]
  },
]
