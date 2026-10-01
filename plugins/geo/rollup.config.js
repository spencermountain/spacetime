import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const banner = `/* spencermountain/spacetime-geo ${pkg.version} MIT */`

export default {
  input: 'src/index.js',
  plugins: [nodeResolve(), commonjs(), json()],
  output: [
    {
      banner,
      file: 'builds/spacetime-geo.mjs',
      format: 'esm'
    },
    {
      banner,
      file: 'builds/spacetime-geo.cjs',
      format: 'cjs'
    },
    {
      banner,
      file: 'builds/spacetime-geo.min.js',
      format: 'umd',
      name: 'spacetimeGeo',
      plugins: [terser()]
    }
  ]
}
