import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
const version = pkg.version
console.log('\n 📦  - running rollup..\n')

const banner = '/* spencermountain/spacetime ' + version + ' Apache 2.0 */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime.mjs', format: 'esm' }],
    plugins: [nodeResolve(), json(), terser()]
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
      nodeResolve(),
      json(),
      commonjs(),
    ]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime.min.js', format: 'umd', name: 'spacetime' }],
    plugins: [
      nodeResolve(),
      json(),
      commonjs(),
      terser(),
    ]
  }
]
