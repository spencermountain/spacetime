import terser from '@rollup/plugin-terser'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const banner = `/* spencermountain/spacetime-week-of-month ${pkg.version} Apache 2.0 */`

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'builds/spacetime-week-of-month.mjs',
      format: 'esm'
    },
    {
      banner,
      file: 'builds/spacetime-week-of-month.cjs',
      format: 'cjs'
    },
    {
      banner,
      file: 'builds/spacetime-week-of-month.min.js',
      format: 'umd',
      name: 'weekOfMonth',
      plugins: [terser()]
    }
  ]
}
