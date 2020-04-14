import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import sizeCheck from 'rollup-plugin-filesize-check'
import { version } from './package.json'

console.log('\n 📦  - running rollup..\n')

const banner = '/* spencermountain/spacetime ' + version + ' Apache 2.0 */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime.mjs', format: 'esm' }],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env']
      }),
      sizeCheck({ expect: 92, warn: 10 })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        banner: banner,
        file: 'builds/spacetime.js',
        format: 'umd',
        sourcemap: false,
        name: 'spacetime'
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
      sizeCheck({ expect: 95, warn: 10 })
    ]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime.min.js', format: 'umd', name: 'spacetime' }],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env']
      }),
      terser(),
      sizeCheck({ expect: 45, warn: 10 })
    ]
  }
]
