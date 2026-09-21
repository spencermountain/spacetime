import terser from '@rollup/plugin-terser'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const banner = `/* spencermountain/space-age ${pkg.version} MIT */`

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'builds/space-age.mjs',
      format: 'esm'
    },
    {
      banner,
      file: 'builds/space-age.cjs',
      format: 'cjs'
    },
    {
      banner,
      file: 'builds/space-age.min.js',
      format: 'umd',
      name: 'spaceAge',
      plugins: [terser()]
    }
  ]
}
