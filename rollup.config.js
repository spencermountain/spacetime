import sizeCheck from 'rollup-plugin-filesize-check'
import terser from '@rollup/plugin-terser'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
console.log('\n 📦  - running rollup..\n')

const banner = `/* spencermountain/${pkg.name} ${pkg.version} ${pkg.license} */`

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'builds/spacetime.mjs',
      format: 'esm',
      plugins: [terser()]
    },
    {
      banner,
      file: 'builds/spacetime.cjs',
      format: 'cjs'
    },
    {
      banner,
      file: 'builds/spacetime.min.js',
      format: 'umd',
      name: 'spacetime',
      plugins: [
        terser(),
        sizeCheck({
          expect: 45, // sizes in kb
          warn: 10, // acceptable change (+/-)
          throw: 25 // unacceptable change (+/-)
        })
      ]
    }
  ]
}
