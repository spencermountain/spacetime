import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const banner = `/* spencermountain/spacetime-geo ${pkg.version} MIT
 * Boundary data: Timezone Boundary Builder / OpenStreetMap contributors, ODbL-1.0.
 * https://github.com/evansiroky/timezone-boundary-builder — see timezone-data.LICENSE.
 */`

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
