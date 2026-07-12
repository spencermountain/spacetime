import fs from 'fs'
import terser from '@rollup/plugin-terser'
const pkg = JSON.parse(fs.readFileSync('./package.json').toString())

console.log('\n 📦  - running rollup..\n')

const name = 'spacetime-week-start'
const banner = `/* spencermountain/${name} ${pkg.version} MIT */`

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.mjs`, format: 'esm' }],
    plugins: [terser()]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.cjs`, format: 'umd', sourcemap: false, name: 'weekStart' }],
    plugins: [terser()]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.min.js`, format: 'umd', name: 'weekStart' }],
    plugins: [terser()]
  }
]
