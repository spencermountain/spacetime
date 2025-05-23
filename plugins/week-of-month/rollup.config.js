import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'
import { version } from './package.json'

console.log('\n 📦  - running rollup..\n')

const name = 'spacetime-week-of-month'
const banner = `/* spencermountain/${name} ` + version + ' Apache 2.0 */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.mjs`, format: 'esm' }],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 1, warn: 10 })]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.cjs`, format: 'umd', sourcemap: false, name: 'weekOfMonth' }],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 1, warn: 10 })]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.min.js`, format: 'umd', name: 'weekOfMonth' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 1, warn: 10 })]
  }
]
