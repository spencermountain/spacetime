import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',
  external: ['spacetime'],
  output: [
    {
      file: 'builds/spacetime-holiday.mjs',
      format: 'esm'
    },
    {
      file: 'builds/spacetime-holiday.cjs',
      format: 'cjs'
    },
    {
      file: 'builds/spacetime-holiday.min.js',
      format: 'umd',
      name: 'spacetimeHoliday',
      globals: { spacetime: 'spacetime' },
      plugins: [terser()]
    }
  ]
}
