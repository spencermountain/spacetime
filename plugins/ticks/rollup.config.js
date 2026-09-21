import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  plugins: [nodeResolve()],
  output: [
    {
      file: 'builds/spacetime-ticks.mjs',
      format: 'esm'
    },
    {
      file: 'builds/spacetime-ticks.cjs',
      format: 'cjs'
    },
    {
      file: 'builds/spacetime-ticks.min.js',
      format: 'umd',
      name: 'spacetime-ticks',
      plugins: [terser()]
    }
  ]
}
