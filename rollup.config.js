import sizeCheck from 'rollup-plugin-filesize-check'
import terser from '@rollup/plugin-terser'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
console.log('\n 📦  - running rollup..\n')

const banner = `/* spencermountain/${pkg.name} ${pkg.version} ${pkg.license} */`

const main = {
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

const temporal = {
  input: 'src/temporal/index.js',
  output: [
    { file: 'builds/spacetime-temporal.mjs', format: 'esm', plugins: [terser()] },
    { file: 'builds/spacetime-temporal.cjs', format: 'cjs', plugins: [terser()] }
  ]
}

export default [main, temporal]
