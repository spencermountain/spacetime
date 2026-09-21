import terser from '@rollup/plugin-terser'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const banner = `/* spencermountain/spacetime-week-start ${pkg.version} MIT */`

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'builds/spacetime-week-start.mjs',
      format: 'esm',
      plugins: [terser()]
    },
    {
      banner,
      file: 'builds/spacetime-week-start.cjs',
      format: 'cjs',
      plugins: [terser()]
    },
    {
      banner,
      file: 'builds/spacetime-week-start.min.js',
      format: 'umd',
      name: 'weekStart',
      plugins: [terser()]
    }
  ]
}
