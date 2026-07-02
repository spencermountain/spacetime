import fs from 'fs'
import { terser } from 'rollup-plugin-terser'
const pkg = JSON.parse(fs.readFileSync('./package.json').toString())

console.log('\n 📦  - running rollup..\n')

const name = 'spacetime-start'
const banner = `/* spencermountain/${name} ${pkg.version} MIT */`

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.mjs`, format: 'esm' }]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.cjs`, format: 'umd', sourcemap: false, name: 'spacetimeStart' }]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: `builds/${name}.min.js`, format: 'umd', name: 'spacetimeStart' }],
    plugins: [terser()]
  }
]
