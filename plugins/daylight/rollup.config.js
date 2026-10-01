import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const banner = `/* spencermountain/spacetime-daylight ${pkg.version} MIT */`

export default {
  input: 'src/index.js',
  plugins: [nodeResolve(), commonjs()],
  output: [
    {
      banner,
      file: 'builds/spacetime-daylight.mjs',
      format: 'esm'
    },
    {
      banner,
      file: 'builds/spacetime-daylight.cjs',
      format: 'cjs'
    },
    {
      banner,
      file: 'builds/spacetime-daylight.min.js',
      format: 'umd',
      name: 'spacetimeDaylight',
      plugins: [terser()]
    }
  ]
}
