import sizeCheck from 'rollup-plugin-filesize-check'
import terser from '@rollup/plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
console.log('\n 📦  - running rollup..\n')

const banner = `/* spencermountain/${pkg.name} ${pkg.version} ${pkg.license} */`

// strip types only; `pnpm typecheck` does the type-checking
const ts = esbuild({ target: 'es2022', minify: false })

const main = {
  input: 'src/index.ts',
  plugins: [ts],
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
  input: 'src/temporal/index.ts',
  plugins: [ts],
  output: [
    { file: 'builds/spacetime-temporal.mjs', format: 'esm', plugins: [terser()] },
    { file: 'builds/spacetime-temporal.cjs', format: 'cjs', plugins: [terser()] }
  ]
}

export default [main, temporal]
